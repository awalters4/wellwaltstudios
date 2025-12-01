#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BTB_FILE = path.join(__dirname, 'src', 'data', 'posts.js');

// Helper to prompt user
function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

// Helper to prompt for multiline content
function promptMultiline(question) {
  return new Promise((resolve) => {
    console.log(`${question} (Press Ctrl+D when done, or type END on a new line):`);
    let lines = [];

    rl.on('line', (line) => {
      if (line === 'END') {
        rl.removeAllListeners('line');
        resolve(lines.join('\n'));
      } else {
        lines.push(line);
      }
    });

    rl.on('close', () => {
      resolve(lines.join('\n'));
    });
  });
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Generate unique ID
function generateId(existingPosts) {
  const maxId = existingPosts.reduce((max, post) => {
    const id = parseInt(post.id);
    return id > max ? id : max;
  }, 0);
  return String(maxId + 1);
}

// Parse tags input
function parseTags(tagsInput) {
  return tagsInput
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0);
}

// Convert YouTube URL to embed URL
function convertToYouTubeEmbed(url) {
  const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\/]+)/);
  if (videoIdMatch) {
    return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
  }
  return url;
}

// Read and parse the posts.js file
function readBTBFile() {
  const content = fs.readFileSync(BTB_FILE, 'utf8');

  // Extract mockPosts array
  const match = content.match(/export const mockPosts = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error('Could not find mockPosts array in posts.js');
  }

  // Parse the array (this is a bit hacky but works for our use case)
  const postsArrayStr = match[1];
  const posts = eval(postsArrayStr);

  return { content, posts };
}

// Write updated posts back to file
function writeBTBFile(content, posts) {
  // Convert posts back to formatted string
  const postsStr = JSON.stringify(posts, null, 2)
    .replace(/"([^"]+)":/g, '$1:') // Remove quotes from keys
    .replace(/: "([^"]*?)\\n([^"]*?)"/g, (match, p1, p2) => {
      // Handle multiline strings
      return `: "${p1}\\n${p2}"`;
    });

  // Replace old mockPosts with new one
  const newContent = content.replace(
    /export const mockPosts = \[[\s\S]*?\n\];/,
    `export const mockPosts = ${postsStr};`
  );

  fs.writeFileSync(BTB_FILE, newContent, 'utf8');
}

// Main functions for each content type
async function addBlog() {
  console.log('\n📝 Adding a new blog post...\n');

  const title = await prompt('Title: ');
  const subtitle = await prompt('Subtitle/Excerpt: ');
  const tagsInput = await prompt('Tags (comma-separated, e.g. aurova, gypsy, femalefounder) - don\'t add #: ');

  console.log('\nContent (paste your blog content, then press Ctrl+D or type END on a new line):');
  const content = await promptMultiline('');

  const tags = parseTags(tagsInput);
  const slug = generateSlug(title);

  const { content: fileContent, posts } = readBTBFile();

  const newPost = {
    id: generateId(posts),
    type: 'article',
    title,
    slug,
    excerpt: subtitle,
    content,
    embedUrl: null,
    tags,
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost); // Add to beginning
  writeBTBFile(fileContent, posts);

  console.log('\n✅ Blog post added successfully!');
  console.log(`   Slug: ${slug}`);
  console.log(`   View at: /behind-the-build/${slug}\n`);
}

async function addVlog() {
  console.log('\n🎥 Adding a new vlog...\n');

  const title = await prompt('Title: ');
  const subtitle = await prompt('Subtitle/Excerpt: ');
  const tagsInput = await prompt('Tags (comma-separated, e.g. aurova, gypsy, femalefounder) - don\'t add #: ');
  const youtubeUrl = await prompt('YouTube video URL: ');

  const tags = parseTags(tagsInput);
  const embedUrl = convertToYouTubeEmbed(youtubeUrl);

  const { content: fileContent, posts } = readBTBFile();

  const newPost = {
    id: generateId(posts),
    type: 'video',
    title,
    slug: generateSlug(title),
    excerpt: subtitle,
    content: null,
    embedUrl,
    tags,
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  writeBTBFile(fileContent, posts);

  console.log('\n✅ Vlog added successfully!\n');
}

async function addNote() {
  console.log('\n📌 Adding a studio note...\n');

  const title = await prompt('Title: ');
  const tagsInput = await prompt('Tags (comma-separated, e.g. aurova, gypsy, femalefounder) - don\'t add #: ');

  console.log('\nNote content (paste your note, then press Ctrl+D or type END on a new line):');
  const content = await promptMultiline('');

  const tags = parseTags(tagsInput);

  const { content: fileContent, posts } = readBTBFile();

  const newPost = {
    id: generateId(posts),
    type: 'studio-note',
    title,
    slug: generateSlug(title),
    excerpt: content.substring(0, 100) + '...',
    content,
    embedUrl: null,
    tags,
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  writeBTBFile(fileContent, posts);

  console.log('\n✅ Studio note added successfully!\n');
}

async function addEmbed() {
  console.log('\n📱 Adding a social media embed...\n');

  const platform = await prompt('Platform (tiktok/instagram): ');
  const caption = await prompt('Caption: ');
  const url = await prompt('Post URL: ');
  const tagsInput = await prompt('Tags (comma-separated, optional, e.g. aurova, gypsy, femalefounder) - don\'t add #: ');

  const tags = parseTags(tagsInput);

  const { content: fileContent, posts } = readBTBFile();

  const newPost = {
    id: generateId(posts),
    type: 'embed',
    title: `${platform.charAt(0).toUpperCase() + platform.slice(1)} Post`,
    slug: generateSlug(caption),
    excerpt: caption,
    content: null,
    embedUrl: url,
    embedPlatform: platform.toLowerCase(),
    tags: tags.length > 0 ? tags : [platform.toLowerCase()],
    createdAt: new Date().toISOString()
  };

  posts.unshift(newPost);
  writeBTBFile(fileContent, posts);

  console.log('\n✅ Social media embed added successfully!\n');
}

// Main CLI handler
async function main() {
  const command = process.argv[2];

  if (!command) {
    console.log(`
Usage: node btb.js <command>

Commands:
  blog   - Add a new blog post
  vlog   - Add a new video/vlog
  note   - Add a studio note
  embed  - Add a social media embed

Example:
  node btb.js blog
    `);
    rl.close();
    return;
  }

  try {
    switch (command.toLowerCase()) {
      case 'blog':
        await addBlog();
        break;
      case 'vlog':
        await addVlog();
        break;
      case 'note':
        await addNote();
        break;
      case 'embed':
        await addEmbed();
        break;
      default:
        console.log(`Unknown command: ${command}`);
        console.log('Valid commands: blog, vlog, note, embed');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    rl.close();
  }
}

main();

// Support page for Gypsy
// React component version

export default function GypsySupport() {
  return (
    <>
      <style>{`
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          color: #333;
        }
        h1 { color: #8B5CF6; margin-bottom: 10px; }
        h2 { color: #8B5CF6; margin-top: 30px; border-bottom: 2px solid #8B5CF6; padding-bottom: 5px; }
        h3 { color: #666; margin-top: 20px; }
        p { margin: 10px 0; }
        ul { margin: 10px 0; padding-left: 20px; }
        .last-updated { color: #666; font-style: italic; }
      `}</style>

      <h1>Gypsy Support</h1>
      <p className="last-updated"><strong>Last Updated:</strong> December 23, 2025</p>

      <h2>About Gypsy</h2>
      <p>Gypsy is an AI-powered tarot card reader that provides personalized interpretations and insights through custom spreads. Whether you're seeking guidance, reflection, or a new perspective, Gypsy combines traditional tarot wisdom with modern AI to deliver meaningful readings.</p>

      <h2>How to Use Gypsy</h2>
      <h3>Getting Started</h3>
      <ul>
        <li>Visit the Gypsy web app at <a href="https://gypsy-xi.vercel.app">gypsy-xi.vercel.app</a></li>
        <li>Select a tarot spread that resonates with your question or situation</li>
        <li>Draw your cards and receive your personalized interpretation</li>
      </ul>

      <h3>Available Spreads</h3>
      <p>Gypsy offers various tarot spreads for different types of questions and situations. Each spread is designed to provide specific insights based on the nature of your inquiry.</p>

      <h2>Frequently Asked Questions</h2>

      <h3>Is Gypsy free to use?</h3>
      <p>Yes, Gypsy is currently free to use. You can perform unlimited readings at no cost.</p>

      <h3>How accurate are the readings?</h3>
      <p>Gypsy uses AI to interpret traditional tarot card meanings in the context of your specific spread. The accuracy and relevance of readings depend on how you frame your questions and your openness to the insights provided. Remember, tarot is a tool for reflection and guidance, not prediction.</p>

      <h3>Do I need to create an account?</h3>
      <p>Currently, no account is required to use Gypsy. Simply visit the website and start your reading.</p>

      <h3>Can I save my readings?</h3>
      <p>Reading history features may be added in future updates. For now, we recommend taking screenshots or notes of readings you want to remember.</p>

      <h3>Is my data private?</h3>
      <p>Yes. Please see our <a href="/gypsyprivacy">Privacy Policy</a> for detailed information about how we handle your data.</p>

      <h2>Technical Support</h2>

      <h3>The app isn't loading</h3>
      <ul>
        <li>Try refreshing your browser</li>
        <li>Clear your browser cache and cookies</li>
        <li>Try a different browser (Chrome, Safari, Firefox)</li>
        <li>Check your internet connection</li>
      </ul>

      <h3>Cards aren't displaying properly</h3>
      <ul>
        <li>Ensure JavaScript is enabled in your browser</li>
        <li>Try using a modern, up-to-date browser</li>
        <li>Disable browser extensions that might interfere with the site</li>
      </ul>

      <h3>I'm experiencing slow performance</h3>
      <ul>
        <li>The AI interpretation may take a few moments to generate</li>
        <li>Close other browser tabs to free up resources</li>
        <li>Check your internet connection speed</li>
      </ul>

      <h2>Contact Us</h2>
      <p>If you have questions, feedback, or need assistance that isn't covered here:</p>
      <ul>
        <li><strong>Email:</strong> ariel@wellwaltstudios.com</li>
        <li><strong>Website:</strong> <a href="https://www.wellwaltstudios.com">https://www.wellwaltstudios.com</a></li>
      </ul>

      <h2>Feedback and Feature Requests</h2>
      <p>We're always looking to improve Gypsy! If you have suggestions for new features, spreads, or improvements, please reach out to us at ariel@wellwaltstudios.com</p>

      <h2>Disclaimer</h2>
      <p>Gypsy is intended for entertainment and self-reflection purposes only. The readings provided should not be considered professional advice for medical, legal, financial, or other important life decisions. Always consult qualified professionals for serious matters.</p>

      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />
      <p style={{ textAlign: 'center', color: '#666' }}><strong>Thank you for using Gypsy!</strong></p>
    </>
  );
}

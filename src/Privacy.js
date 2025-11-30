// Privacy Policy for Aurova
// React component version
// Import and use in your React app at: https://www.wellwaltstudios.com/privacy

export default function Privacy() {
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
        h1 { color: #FF6B9D; margin-bottom: 10px; }
        h2 { color: #FF6B9D; margin-top: 30px; border-bottom: 2px solid #FF6B9D; padding-bottom: 5px; }
        h3 { color: #666; margin-top: 20px; }
        p { margin: 10px 0; }
        ul { margin: 10px 0; padding-left: 20px; }
        .last-updated { color: #666; font-style: italic; }
      `}</style>

      <h1>Privacy Policy for Aurova</h1>
      <p className="last-updated"><strong>Last Updated:</strong> November 30, 2025</p>

      <h2>Introduction</h2>
      <p>Aurova ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application.</p>

      <h2>Information We Collect</h2>

      <h3>Personal Information</h3>
      <ul>
        <li><strong>Account Information:</strong> Email address or phone number (for authentication)</li>
        <li><strong>Profile Data:</strong> Display name (optional), profile settings</li>
        <li><strong>Authentication Data:</strong> Encrypted session tokens stored locally on your device</li>
      </ul>

      <h3>Habit Tracking Data</h3>
      <ul>
        <li><strong>Habit Information:</strong> Custom habit names, emojis, settings, and completion records</li>
        <li><strong>Progress Photos:</strong> Photos you choose to upload for progress tracking (optional)</li>
        <li><strong>Mood Data:</strong> Mood selections and daily reflections (optional)</li>
        <li><strong>Notes:</strong> Personal notes and reflections you create</li>
      </ul>

      <h3>Social Features Data</h3>
      <ul>
        <li><strong>Friend Connections:</strong> Email addresses of friends you connect with</li>
        <li><strong>Messages:</strong> Direct messages and nudges sent to friends (140 character limit)</li>
        <li><strong>Shared Data:</strong> Progress data you choose to share with friends</li>
      </ul>

      <h3>Automatically Collected Information</h3>
      <ul>
        <li><strong>Device Information:</strong> Device type, operating system version</li>
        <li><strong>Usage Data:</strong> App features used, crash reports, error logs (via Sentry)</li>
        <li><strong>Notification Tokens:</strong> Push notification device tokens</li>
      </ul>

      <h3>Health Data (Optional)</h3>
      <ul>
        <li><strong>Apple Health/HealthKit:</strong> Workout data, steps, active energy (if you grant permission)</li>
        <li><strong>Google Fit:</strong> Activity data, step count, workout sessions (if you grant permission)</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and maintain the Aurova app functionality</li>
        <li>Authenticate and secure your account with Face ID/Touch ID</li>
        <li>Track your habits and display progress</li>
        <li>Enable social features (friend connections, messages, nudges)</li>
        <li>Send push notifications for reminders and milestones</li>
        <li>Sync your data across your devices</li>
        <li>Analyze app usage to improve features</li>
        <li>Debug and fix technical issues</li>
      </ul>

      <h2>Data Storage and Security</h2>
      <ul>
        <li><strong>Supabase Backend:</strong> Your data is stored on Supabase servers with industry-standard encryption</li>
        <li><strong>Local Storage:</strong> Session data and offline cache stored securely on your device</li>
        <li><strong>Biometric Authentication:</strong> Face ID/Touch ID data never leaves your device</li>
        <li><strong>Encryption:</strong> All data transmitted between your device and our servers uses HTTPS/TLS encryption</li>
        <li><strong>Secure Storage:</strong> Sensitive data on your device uses iOS Keychain/Android Keystore</li>
      </ul>

      <h2>Data Sharing</h2>
      <p>We do NOT sell your personal information. We only share data:</p>

      <h3>With Your Consent</h3>
      <ul>
        <li><strong>Friends:</strong> Progress data you explicitly choose to share with connected friends</li>
        <li><strong>Social Sharing:</strong> Photos/progress you choose to share on social media</li>
      </ul>

      <h3>Service Providers</h3>
      <ul>
        <li><strong>Supabase:</strong> Database and authentication services</li>
        <li><strong>Expo:</strong> Push notifications and app updates</li>
        <li><strong>Sentry:</strong> Error tracking and crash reporting (anonymized)</li>
        <li><strong>Apple/Google:</strong> Push notification delivery</li>
      </ul>

      <h3>Legal Requirements</h3>
      <p>We may disclose your information if required by law or to:</p>
      <ul>
        <li>Comply with legal processes</li>
        <li>Protect our rights and safety</li>
        <li>Prevent fraud or security issues</li>
      </ul>

      <h2>Your Data Rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of your data</li>
        <li><strong>Delete:</strong> Request deletion of your account and all associated data</li>
        <li><strong>Modify:</strong> Update or correct your personal information</li>
        <li><strong>Export:</strong> Download your habit tracking data</li>
        <li><strong>Opt-Out:</strong> Disable push notifications, social features, or health data integrations</li>
      </ul>
      <p>To exercise these rights, contact us at ariel@wellwaltstudios.com</p>

      <h2>Data Retention</h2>
      <ul>
        <li><strong>Active Accounts:</strong> We retain your data while your account is active</li>
        <li><strong>Deleted Accounts:</strong> Data is permanently deleted within 30 days of account deletion</li>
        <li><strong>Backups:</strong> Backup copies are deleted within 90 days</li>
      </ul>

      <h2>Children's Privacy</h2>
      <p>Aurova is not intended for children under 13. We do not knowingly collect data from children under 13. If we discover we have collected data from a child under 13, we will delete it immediately.</p>

      <h2>Third-Party Integrations</h2>
      <p>When you connect third-party services (Strava, MyFitnessPal, Apple Health, etc.):</p>
      <ul>
        <li>We only access data you explicitly authorize</li>
        <li>You can revoke access at any time in app settings</li>
        <li>Each service has its own privacy policy</li>
      </ul>

      <h2>International Data Transfers</h2>
      <p>Your data may be transferred to and stored on servers in different countries. By using Aurova, you consent to such transfers. We ensure appropriate safeguards are in place.</p>

      <h2>Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy periodically. We will notify you of significant changes via:</p>
      <ul>
        <li>In-app notification</li>
        <li>Email to your registered address</li>
      </ul>
      <p>Continued use after changes constitutes acceptance.</p>

      <h2>California Privacy Rights (CCPA)</h2>
      <p>California residents have additional rights:</p>
      <ul>
        <li>Right to know what personal information is collected</li>
        <li>Right to delete personal information</li>
        <li>Right to opt-out of sale of personal information (we don't sell data)</li>
        <li>Right to non-discrimination for exercising privacy rights</li>
      </ul>

      <h2>GDPR Compliance (EU Users)</h2>
      <p>EU residents have rights under GDPR:</p>
      <ul>
        <li>Right to access, rectification, erasure</li>
        <li>Right to data portability</li>
        <li>Right to restrict processing</li>
        <li>Right to object to processing</li>
        <li>Right to withdraw consent</li>
      </ul>

      <h2>Contact Us</h2>
      <p>For privacy questions or requests:</p>
      <ul>
        <li><strong>Email:</strong> ariel@wellwaltstudios.com</li>
        <li><strong>Website:</strong> <a href="https://www.wellwaltstudios.com">https://www.wellwaltstudios.com</a></li>
        <li><strong>Address:</strong> Well Walt Studios, Orleans Parish, Louisiana</li>
      </ul>

      <h2>Cookie Policy</h2>
      <p>Aurova does not use cookies. We use local storage for authentication and offline functionality only.</p>

      <hr style={{ margin: '40px 0', border: 'none', borderTop: '1px solid #ddd' }} />
      <p style={{ textAlign: 'center', color: '#666' }}><strong>By using Aurova, you agree to this Privacy Policy.</strong></p>
    </>
  );
}

import React from "react";
import { useParams } from "react-router-dom";

const contentMap = {
  "terms-of-service": {
    title: "Terms of Service",
    content: `
      <h2>1. Introduction</h2>
<p>Welcome to <strong>DeFi Strategies</strong>. These Terms of Service govern your access to and use of our platform, which provides educational content and tools for exploring decentralized finance (DeFi) strategies. By accessing or using our services, you agree to comply with these Terms and acknowledge that you have read, understood, and accepted all the policies referenced within.</p>

<h2>2. Eligibility and User Responsibilities</h2>
<p>Our platform is intended for users who are at least 18 years of age. By using the service, you affirm that you are legally able to enter into a binding agreement. You agree to use our services in a manner consistent with applicable laws and regulations. Users are responsible for maintaining the confidentiality of their login credentials and for all activities that occur under their account.</p>

<h2>3. Educational Use Only</h2>
<p>DeFi Strategies is an informational platform created for educational purposes only. The strategies, articles, and resources provided are not to be interpreted as financial, investment, legal, or trading advice. We do not guarantee profits or outcomes based on the information provided. Always conduct your own research and consult with a qualified financial advisor before making any investment decisions.</p>

<h2>4. Account Creation and Security</h2>
<p>To access some features, users may need to create an account by providing accurate and complete information. You agree not to impersonate another person or misrepresent your affiliation with a person or entity. You are solely responsible for protecting your account credentials and must notify us immediately in case of any unauthorized access or suspicious activity. We are not liable for any loss or damage arising from your failure to comply with this security obligation.</p>

<h2>5. Acceptable Use Policy</h2>
<p>While using our platform, you agree not to engage in activities that are harmful, illegal, or disruptive. Prohibited activities include, but are not limited to:</p>
<ul>
  <li>Attempting to gain unauthorized access to other user accounts or backend systems.</li>
  <li>Uploading viruses, malicious code, or conducting any form of cyber attack.</li>
  <li>Scraping, copying, or redistributing our content without permission.</li>
  <li>Using our platform for unlawful, harmful, or deceptive activities.</li>
</ul>
<p>Violating our Acceptable Use Policy may result in immediate termination of your account and access to our platform.</p>

<h2>6. Intellectual Property Rights</h2>
<p>All intellectual property on DeFi Strategies, including text, graphics, logos, icons, images, videos, and software, is either owned by or licensed to us. You may view, download, and print content for your personal, non-commercial use, but you may not modify, reproduce, distribute, or exploit any content without prior written consent from us.</p>

<h2>7. Third-Party Services and Links</h2>
<p>Our platform may contain links to third-party websites or tools that are not owned or controlled by DeFi Strategies. We are not responsible for the content, privacy practices, or terms of these third-party services. Accessing such external resources is at your own risk, and you should review their respective terms and policies before engaging with them.</p>

<h2>8. Platform Availability and Modifications</h2>
<p>We aim to provide a stable and uninterrupted experience, but we do not guarantee that our services will be available at all times. We reserve the right to modify, suspend, or discontinue any feature or functionality without notice. We may also introduce new services, impose limitations, or restrict access to certain areas at our discretion.</p>

<h2>9. Limitation of Liability</h2>
<p>To the fullest extent permitted by law, DeFi Strategies shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill. Our platform is provided "as is" and "as available," without warranties of any kind. You acknowledge and agree that your use of the platform is at your sole risk.</p>

<h2>10. Indemnification</h2>
<p>You agree to indemnify, defend, and hold harmless DeFi Strategies and its affiliates, officers, agents, and employees from any claims, liabilities, damages, losses, and expenses (including legal fees) arising out of or related to your use of the platform, violation of these Terms, or infringement of any intellectual property or other rights of any person or entity.</p>

<h2>11. Termination</h2>
<p>We reserve the right to terminate or suspend your access to the platform, with or without notice, if we believe that you have violated these Terms or engaged in any behavior that may harm the platform or its users. Upon termination, your right to access or use our services will immediately cease.</p>

<h2>12. Governing Law and Dispute Resolution</h2>
<p>These Terms are governed by and construed in accordance with the laws of the jurisdiction in which DeFi Strategies operates. Any disputes arising out of or relating to these Terms shall be resolved in the local courts of that jurisdiction. You agree to submit to the exclusive jurisdiction of these courts.</p>

<h2>13. Updates to the Terms</h2>
<p>We may update these Terms of Service from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When changes are made, we will revise the "Last Updated" date at the bottom of this document. We encourage you to review the Terms regularly to stay informed. Your continued use of the platform constitutes your acceptance of the revised Terms.</p>

<h2>14. Contact Us</h2>
<p>If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at <strong>support@defistrategies.com</strong>. We value your input and will do our best to address your inquiry promptly.</p>

<p><em>Last Updated: June 2025</em></p>

    `,
  },
  "privacy-policy": {
    title: "Privacy Policy",
    content: `
     <h2>1. Introduction</h2>
<p>At <strong>DeFi Strategies</strong>, we value your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, store, and share your information when you interact with our platform. By using our services, you agree to the collection and use of information in accordance with this policy.</p>

<h2>2. Information We Collect</h2>
<p>We collect the following types of information:</p>
<ul>
  <li><strong>Personal Information:</strong> Name, email address, and any other details you voluntarily provide during registration or through contact forms.</li>
  <li><strong>Usage Data:</strong> Information such as your IP address, browser type, pages visited, time spent on the site, and other diagnostic data.</li>
  <li><strong>Device Data:</strong> We may collect information about the device you use to access our services, including device type, operating system, and unique identifiers.</li>
</ul>

<h2>3. How We Use Your Information</h2>
<p>We use the information we collect for the following purposes:</p>
<ul>
  <li>To provide and maintain our platform.</li>
  <li>To communicate with you regarding your account, updates, or customer support requests.</li>
  <li>To personalize your experience and deliver relevant content.</li>
  <li>To analyze usage trends and improve platform performance.</li>
  <li>To comply with legal obligations and prevent fraudulent activity.</li>
</ul>

<h2>4. Legal Basis for Processing</h2>
<p>We process your personal data under the following legal bases:</p>
<ul>
  <li><strong>Consent:</strong> When you provide consent (e.g., by submitting a contact form).</li>
  <li><strong>Contractual Obligation:</strong> When processing is necessary to fulfill our contract with you.</li>
  <li><strong>Legitimate Interests:</strong> For platform analytics and improvements, provided these interests are not overridden by your rights.</li>
  <li><strong>Legal Compliance:</strong> When we are required by law to process your information.</li>
</ul>

<h2>5. Cookies and Tracking Technologies</h2>
<p>We use cookies and similar tracking technologies to improve your browsing experience, understand user behavior, and analyze traffic patterns. You can control or disable cookies through your browser settings. Disabling cookies may affect certain features of our platform.</p>

<h2>6. Sharing of Information</h2>
<p>We do not sell or rent your personal data to third parties. However, we may share your information with trusted partners or service providers who assist in operating our platform, conducting business, or servicing you — provided they agree to keep the information confidential and comply with data protection regulations.</p>

<h2>7. Data Retention</h2>
<p>We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your information, we will securely delete or anonymize it.</p>

<h2>8. Data Security</h2>
<p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. While we strive to use commercially acceptable means to protect your data, no method of transmission over the internet is 100% secure.</p>

<h2>9. Your Rights</h2>
<p>You have the following rights regarding your personal data:</p>
<ul>
  <li>The right to access and receive a copy of your data.</li>
  <li>The right to request corrections to your data.</li>
  <li>The right to request deletion of your data.</li>
  <li>The right to object to or restrict certain types of processing.</li>
  <li>The right to withdraw your consent at any time.</li>
</ul>
<p>To exercise any of these rights, please contact us at <strong>support@defistrategies.com</strong>.</p>

<h2>10. International Data Transfers</h2>
<p>Our platform may be accessed globally, which may involve transferring your data outside your country of residence. We ensure that appropriate safeguards are in place to protect your data, in line with applicable data protection laws such as the GDPR.</p>

<h2>11. Children's Privacy</h2>
<p>Our services are not intended for use by individuals under the age of 18. We do not knowingly collect personally identifiable information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us to request removal.</p>

<h2>12. Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time. If we make significant changes, we will notify you via email or post a notice on our website. Your continued use of the platform after such changes constitutes your acceptance of the new policy.</p>

<h2>13. Contact Us</h2>
<p>If you have any questions, concerns, or requests related to this Privacy Policy, you can reach out to us at <strong>support@defistrategies.com</strong>. We aim to respond to all queries within a reasonable timeframe.</p>

<p><em>Last Updated: June 2025</em></p>

    `,
  },


"about": {
    title: "About Defi",
    content: `
      <h2>1. Who We Are</h2>
<p><strong>DeFi Strategies</strong> is a forward-thinking educational platform dedicated to helping individuals navigate the fast-evolving world of decentralized finance (DeFi). We are a team of blockchain enthusiasts, developers, researchers, and finance professionals who believe in the power of Web3 technologies to democratize access to financial tools and knowledge.</p>
<p>Our goal is simple: make DeFi strategies understandable, accessible, and safe for everyone — from complete beginners to experienced investors. Whether you’re curious about yield farming, liquidity pools, governance tokens, or simply want to explore the future of finance, we’re here to guide you every step of the way.</p>

<h2>2. Our Mission</h2>
<p>We believe that financial education should be free, unbiased, and easy to understand. Our mission is to empower users through structured educational content, in-depth guides, community-driven insights, and real-world DeFi strategies that can be implemented responsibly.</p>
<p>Unlike platforms that hype speculative trends or promote risky investments, we focus on long-term value, safety, and transparency. Education is at the heart of our mission, and we work tirelessly to ensure our content is always up-to-date, fact-checked, and aligned with the latest developments in the DeFi space.</p>

<h2>3. What We Offer</h2>
<ul>
  <li><strong>Educational Modules:</strong> Step-by-step learning paths designed to take you from DeFi basics to advanced strategies.</li>
  <li><strong>Strategy Library:</strong> A curated list of real, community-tested DeFi strategies with risk indicators and platform walkthroughs.</li>
  <li><strong>DeFi Wiki:</strong> A constantly evolving knowledge base covering DeFi protocols, tools, and key concepts.</li>
  <li><strong>Community Chat:</strong> A safe space for users to ask questions, discuss strategies, and share updates.</li>
  <li><strong>Security Best Practices:</strong> Tutorials and checklists to help users avoid common scams and keep their assets safe.</li>
</ul>

<h2>4. Why DeFi Matters</h2>
<p>Decentralized Finance represents a revolutionary shift in how people access and use financial services. By eliminating intermediaries and giving users direct control over their assets, DeFi opens doors to a more inclusive financial future. However, the learning curve can be steep, and the risks are real.</p>
<p>This is why platforms like DeFi Strategies are critical. We help bridge the knowledge gap between technology and people, making it easier to participate in this ecosystem confidently and securely.</p>

<h2>5. Our Values</h2>
<ul>
  <li><strong>Transparency:</strong> We are open about how we operate, where our content comes from, and what we believe in.</li>
  <li><strong>Integrity:</strong> We never promote protocols or tokens in exchange for compensation. Our content is independent and research-based.</li>
  <li><strong>Inclusivity:</strong> Our resources are designed for everyone — regardless of background, income, or education level.</li>
  <li><strong>Security First:</strong> We advocate for caution and best practices, and we educate users about risks before rewards.</li>
</ul>

<h2>6. Meet the Team</h2>
<p>DeFi Strategies is built by a decentralized team spread across different parts of the world. Our contributors include developers, writers, researchers, and crypto users who volunteer their time to create and maintain the platform. We’re proud to be a grassroots initiative driven by passion, not profit.</p>

<h2>7. Get Involved</h2>
<p>We believe that community collaboration is the key to building trustworthy and sustainable DeFi knowledge. If you’re passionate about decentralized finance and want to contribute, you can:</p>
<ul>
  <li>Write articles or create tutorials</li>
  <li>Help moderate our community chat</li>
  <li>Report outdated or inaccurate content</li>
  <li>Provide feedback or suggest new features</li>
</ul>

<h2>8. Contact Us</h2>
<p>Have questions, feedback, or partnership inquiries? You can reach out to us at <strong>support@defistrategies.com</strong>. We do our best to respond to every email within 48 hours.</p>

<h2>9. Join the Future of Finance</h2>
<p>Whether you’re here to learn, share, or explore — welcome to DeFi Strategies. Together, we’re building a more open and financially educated world.</p>

<p><em>Last updated: June 2025</em></p>


    `,
  },



  "cookies": {
    title: "Cookie Policy",
    content: `
      <h2>1. Introduction</h2>
<p>This Cookie Policy explains how <strong>DeFi Strategies</strong> uses cookies and similar tracking technologies when you visit or interact with our website. By using our site, you consent to the use of cookies in accordance with this policy.</p>

<h2>2. What Are Cookies?</h2>
<p>Cookies are small text files that are stored on your device (computer, smartphone, tablet) when you visit a website. They help the site remember your preferences, enhance performance, and improve the overall user experience.</p>

<h2>3. Types of Cookies We Use</h2>
<p>We use different types of cookies to serve various purposes:</p>
<ul>
  <li><strong>Essential Cookies:</strong> These are required for the website to function properly. They enable core features like page navigation, user login, and form submissions.</li>
  <li><strong>Analytical/Performance Cookies:</strong> These help us understand how users interact with our website, what pages are most visited, and where improvements are needed.</li>
  <li><strong>Functional Cookies:</strong> These remember your choices and preferences to offer a more personalized experience.</li>
  <li><strong>Third-Party Cookies:</strong> Some of our pages may include content or tools from third-party providers (e.g., YouTube, Google Analytics, or community chat integrations). These third parties may place their own cookies.</li>
</ul>

<h2>4. Why We Use Cookies</h2>
<p>We use cookies for several purposes, including:</p>
<ul>
  <li>Enhancing website performance and speed</li>
  <li>Enabling secure logins and access control</li>
  <li>Analyzing traffic and usage trends to improve our services</li>
  <li>Customizing content based on your preferences</li>
</ul>

<h2>5. Google Analytics</h2>
<p>We use Google Analytics to collect anonymous usage data such as session duration, page views, and browser type. This information helps us optimize the website and improve user experience. Google may also use this data according to its own <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</p>

<h2>6. Managing Your Cookie Preferences</h2>
<p>You can manage, block, or delete cookies through your browser settings. Most browsers allow you to:</p>
<ul>
  <li>View what cookies are stored</li>
  <li>Block cookies from specific websites</li>
  <li>Clear all cookies when closing the browser</li>
</ul>
<p>Note that disabling cookies may affect the functionality of the website and limit your access to certain features.</p>

<h2>7. Third-Party Services and Embedded Content</h2>
<p>Some of our pages may contain embedded content (such as YouTube videos or chat widgets) or use third-party APIs. These services may collect cookies or track your interactions, even if you do not directly engage with them. We encourage you to review their privacy and cookie policies individually.</p>

<h2>8. Changes to This Policy</h2>
<p>We reserve the right to update this Cookie Policy at any time. Any changes will be posted on this page with an updated revision date. We recommend reviewing this policy periodically to stay informed about how we use cookies.</p>

<h2>9. Contact Us</h2>
<p>If you have any questions or concerns about this Cookie Policy or our use of cookies, please contact us at <strong>support@defistrategies.com</strong>.</p>

<p><em>Last updated: June 2025</em></p>


    `,
  },


};

const LegalPage = () => {
  const { slug } = useParams();
  const page = contentMap[slug];

  if (!page) {
    return <div className="p-8 text-center text-red-500">Page not found</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-4xl font-extrabold mb-6">{page.title}</h1>

      <div className="prose prose-invert prose-headings:text-white prose-p:text-gray-300 prose-li:text-gray-300 max-w-none" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default LegalPage;

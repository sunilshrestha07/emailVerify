// components/email-templates/EmailTemplate.tsx

import React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => {
  return (
    <div>
      <h1>Hello {firstName}</h1>
      <p>Your verification code is: 123456</p> {/* Replace with dynamic content if needed */}
    </div>
  );
};

export default EmailTemplate;

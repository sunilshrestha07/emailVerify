import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  email: string;
  verificationCode: number; // Changed to camelCase
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const KoalaWelcomeEmail = ({
  email,
  verificationCode, // Changed to camelCase
}: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Preview>This is a verification test</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={paragraph}>Hi {email},</Text>
        <Text style={paragraph}>
          Your verification code is
          <br />
          {verificationCode} {/* Changed to camelCase */}
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          Use this code to verify your account.
        </Text>
      </Container>
    </Body>
  </Html>
);

KoalaWelcomeEmail.PreviewProps = {
  email: "example@example.com",
  verificationCode: 123456, // Changed to camelCase
} as KoalaWelcomeEmailProps;

export default KoalaWelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};

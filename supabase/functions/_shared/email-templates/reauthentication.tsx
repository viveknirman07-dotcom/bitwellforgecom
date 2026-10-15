/// <reference types="npm:@types/react@18.3.1" />

import * as React from 'npm:react@18.3.1'

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from 'npm:@react-email/components@0.0.22'
import { BrandFooter, BrandHeader, BrandFonts, BODY_FONT, DISPLAY_FONT } from '../email-brand.tsx'

interface ReauthenticationEmailProps {
  token: string
}

export const ReauthenticationEmail = ({ token }: ReauthenticationEmailProps) => (
  <Html lang="en" dir="ltr">
    <Head><BrandFonts /></Head>
    <Preview>Your verification code</Preview>
    <Body style={main}>
      <Container style={container}>
        <BrandHeader />
        <Heading style={h1}>Confirm reauthentication</Heading>
        <Text style={text}>Use the code below to confirm your identity:</Text>
        <Text style={codeStyle}>{token}</Text>
        <Text style={footer}>
          This code will expire shortly. If you didn't request this, you can
          safely ignore this email.
        </Text>
        <BrandFooter kind="account" />
      </Container>
    </Body>
  </Html>
)

export default ReauthenticationEmail

const main = { backgroundColor: '#ffffff', fontFamily: BODY_FONT, fontWeight: 400 }
const container = { padding: '20px 25px' }
const h1 = {
  fontFamily: DISPLAY_FONT,
  fontSize: '22px',
  fontWeight: 400,
  color: '#000000',
  margin: '0 0 20px',
}
const text = {
  fontFamily: BODY_FONT, fontWeight: 400, overflowWrap: 'anywhere' as const,
  fontSize: '14px',
  color: '#55575d',
  lineHeight: '1.5',
  margin: '0 0 25px',
}
const codeStyle = {
  fontFamily: BODY_FONT,
  fontSize: '22px',
  fontWeight: 400,
  color: '#000000',
  margin: '0 0 30px',
}
const footer = { fontFamily: BODY_FONT, fontWeight: 400, fontSize: '12px', color: '#999999', margin: '30px 0 0' }

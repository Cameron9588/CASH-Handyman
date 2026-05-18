import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { name, email, rating, comment } = body;

    if (!name || !email || !rating || !comment) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure your email service here
    // Using Gmail as an example (you'll need to set up an app password)
    // Or use any SMTP service of your choice
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return NextResponse.json(
        { error: 'Email credentials are not configured on the server.' },
        { status: 500 }
      );
    }

    const emailHost = process.env.EMAIL_HOST || 'smtp.gmail.com';
    const emailPort = Number(process.env.EMAIL_PORT || 465);
    const emailSecure = process.env.EMAIL_SECURE !== 'false';

    const transporter = nodemailer.createTransport({
      host: emailHost,
      port: emailPort,
      secure: emailSecure,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.verify();

    const stars = '⭐'.repeat(rating);

    const emailContent = `
      <h2>New Review from ${name}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Rating:</strong> ${stars} (${rating} out of 5 stars)</p>
      <p><strong>Review:</strong></p>
      <p>${comment.replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || 'Cameron.sargent@yahoo.com',
      replyTo: email,
      subject: `New Review - ${rating} Star Rating from ${name}`,
      html: emailContent,
    });

    return NextResponse.json(
      { success: true, message: 'Review submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

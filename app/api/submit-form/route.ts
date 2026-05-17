import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const serviceType = formData.get('serviceType') as string;
    const description = formData.get('description') as string;
    const file = formData.get('file') as File | null;

    if (!name || !email || !phone || !address || !serviceType || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure your email service here
    // Using Gmail as an example (you'll need to set up an app password)
    // Or use any SMTP service of your choice
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let attachments: any[] = [];
    if (file) {
      const buffer = await file.arrayBuffer();
      attachments.push({
        filename: file.name,
        content: Buffer.from(buffer),
      });
    }

    const emailContent = `
      <h2>New Service Request from ${name}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Service Type:</strong> ${serviceType}</p>
      <p><strong>Description:</strong></p>
      <p>${description.replace(/\n/g, '<br>')}</p>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'Cameron.sargent@yahoo.com',
      replyTo: email,
      subject: `New Service Request - ${serviceType}`,
      html: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    return NextResponse.json(
      { success: true, message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}

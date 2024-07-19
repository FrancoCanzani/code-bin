import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId, binId, content, isPrivate } = await request.json();

    // Check if content is provided
    if (!content) {
      throw new Error('Content is required');
    }

    // Upsert into bins table (Insert or Update)
    await sql`
      INSERT INTO bins (user_id, bin_id, content, private, created_at)
      VALUES (${userId || null}, ${binId}, ${content}, ${
      isPrivate || false
    }, NOW())
      ON CONFLICT (bin_id) 
      DO UPDATE 
      SET 
        user_id = EXCLUDED.user_id,
        content = EXCLUDED.content,
        private = EXCLUDED.private,
        created_at = EXCLUDED.created_at;
    `;

    // Retrieve the updated list of bins
    const bins = await sql`SELECT * FROM bins;`;

    return NextResponse.json({ bins }, { status: 200 });
  } catch (error) {
    console.log(error);

    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

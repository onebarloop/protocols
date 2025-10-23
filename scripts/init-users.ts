import { db } from '@/db';
import { user } from '@/db/schema/auth-schema';
import { eq } from 'drizzle-orm';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

async function initUsers() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || 'Admin';

  if (!adminEmail || !adminPassword) {
    console.error('❌ Error: ADMIN_EMAIL and ADMIN_PASSWORD must be set');
    process.exit(1);
  }

  // Initialize Better Auth instance for user creation
  const auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: 'pg',
    }),
    emailAndPassword: {
      enabled: true,
    },
  });

  try {
    // Create Admin User
    console.log('🔍 Checking for existing admin user...');
    const existingAdmin = await db
      .select()
      .from(user)
      .where(eq(user.email, adminEmail))
      .limit(1);

    if (existingAdmin.length > 0) {
      console.log('✅ Admin user already exists. Skipping creation.');
      console.log(`   Email: ${adminEmail}`);
    } else {
      console.log('👤 Creating admin user...');

      const adminResult = await auth.api.signUpEmail({
        body: {
          email: adminEmail,
          password: adminPassword,
          name: adminName,
        },
      });

      if (!adminResult || !adminResult.user) {
        throw new Error('Failed to create admin user');
      }

      // Update the user role to admin
      await db
        .update(user)
        .set({
          role: 'admin',
          emailVerified: true,
        })
        .where(eq(user.id, adminResult.user.id));

      console.log('✅ Admin user created successfully!');
      console.log(`   Name: ${adminName}`);
      console.log(`   Email: ${adminEmail}`);
      console.log(`   Role: admin`);
    }

    // Create Guest User
    console.log('\n🔍 Checking for existing guest user...');
    const guestEmail = 'guest@test.de';
    const existingGuest = await db
      .select()
      .from(user)
      .where(eq(user.email, guestEmail))
      .limit(1);

    if (existingGuest.length > 0) {
      console.log('✅ Guest user already exists. Skipping creation.');
      console.log(`   Email: ${guestEmail}`);
    } else {
      console.log('👤 Creating guest user...');

      const guestResult = await auth.api.signUpEmail({
        body: {
          email: guestEmail,
          password: 'password123',
          name: 'Guest',
        },
      });

      if (!guestResult || !guestResult.user) {
        throw new Error('Failed to create guest user');
      }

      // Update the user role to guest
      await db
        .update(user)
        .set({
          role: 'guest',
          emailVerified: true,
        })
        .where(eq(user.id, guestResult.user.id));

      console.log('✅ Guest user created successfully!');
      console.log(`   Name: Guest`);
      console.log(`   Email: ${guestEmail}`);
      console.log(`   Role: guest`);
    }

    console.log('\n🎉 User initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating users:', error);
    process.exit(1);
  }
}

// Run the script
initUsers();

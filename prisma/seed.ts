import * as bcrypt from 'bcrypt';
import slugify from 'slugify';
import { faker } from '@faker-js/faker';
import { PrismaService } from '../src/prisma/prisma.service';

const prisma = new PrismaService();

async function seed() {
  console.log('Seeding 🍀');

  const password = 'password';
  const categories = [
    'general',
    'politics',
    'business',
    'technology',
    'science',
    'sports',
    'health',
  ];

  const [Admin, Editor, User] = await Promise.all([
    prisma.roles.create({ data: { name: 'Admin' } }),
    prisma.roles.create({ data: { name: 'Editor' } }),
    prisma.roles.create({ data: { name: 'User' } }),
  ]);

  const [UserOne, UserTwo] = await Promise.all([
    prisma.users.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        role_id: User.id,
        avatar_image: faker.image.avatarLegacy(),
      },
    }),
    prisma.users.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        role_id: User.id,
        avatar_image: faker.image.avatar(),
      },
    }),
    prisma.users.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        role_id: User.id,
        avatar_image: faker.image.avatarLegacy(),
      },
    }),
  ]);

  const [EditorOne, EditorTwo, EditorThree] = await Promise.all([
    prisma.users.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        role_id: Editor.id,
        avatar_image: faker.image.avatarLegacy(),
      },
    }),
    prisma.users.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        role_id: Editor.id,
        avatar_image: faker.image.avatarLegacy(),
      },
    }),
    prisma.users.create({
      data: {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(password, 10),
        role_id: Editor.id,
        avatar_image: faker.image.avatarLegacy(),
      },
    }),
  ]);

  const admin = await prisma.users.create({
    data: {
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash(password, 10),
      role_id: Admin.id,
      avatar_image: faker.image.avatarLegacy(),
    },
  });

  for (const category of categories) {
    await prisma.categories.create({
      data: {
        name: category,
      },
    });
  }

  for (let i = 0; i < 10; i++) {
    await prisma.articles.create({
      data: {
        title: faker.lorem.sentence(),
        slug: slugify(faker.lorem.sentence(), { lower: true, strict: true }),
        description: faker.lorem.paragraph(),
        content: faker.lorem.paragraphs(),
        image: faker.image.url(),
        approval_state: 'pending',
        category_id: faker.number.int({ min: 1, max: 7 }),
        created_at: faker.date.past(),
        user_authors: {
          create: {
            user_id: Math.random() > 0.5 ? EditorOne.id : EditorTwo.id,
          },
        },
        comments: {
          createMany: {
            data: Array.from({ length: 5 }, () => ({
              content: faker.lorem.paragraph(),
              user_id: Math.random() > 0.5 ? UserOne.id : UserTwo.id,
              created_at: faker.date.past(),
            })),
          },
        },
        statistics: {
          create: {
            likes: faker.number.int({ min: 0, max: 100 }),
            dislikes: faker.number.int({ min: 0, max: 100 }),
            views: faker.number.int({ min: 0, max: 100 }),
          },
        },
      },
    });
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Seeding done ✅');
    await prisma.$disconnect();
  });

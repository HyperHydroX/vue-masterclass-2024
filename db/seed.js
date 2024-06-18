import { createClient } from '@supabase/supabase-js'
import { fakerEN_GB as faker } from '@faker-js/faker'

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function seedProjects(numEntries = 10) {
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name,
      slug: name.toLocaleLowerCase().replace(/ /g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  await supabase.from('projects').insert(projects)
}

await seedProjects()

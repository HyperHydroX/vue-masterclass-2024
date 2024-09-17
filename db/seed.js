/* eslint-env node */

import { fakerEN_GB as faker } from '@faker-js/faker'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(require('node:process').env.VITE_SUPABASE_URL, require('node:process').env.SUPABASE_SERVICE_ROLE_KEY)

function logErrorAndExit(tableName, error) {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`,
  )
  require('node:process').exit(1)
}

function logStep(stepMessage) {
  // eslint-disable-next-line no-console
  console.info(stepMessage)
}

async function seedProjects(numEntries) {
  logStep('Seeding projects...')
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

  const { data, error } = await supabase.from('projects').insert(projects).select('id')

  if (error)
    return logErrorAndExit('Projects', error)

  logStep('Projects seeded successfully.')

  return data
}

async function seedTasks(numEntries, projectIds) {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    })
  }

  const { data, error } = await supabase.from('tasks').insert(tasks).select('id')

  if (error)
    return logErrorAndExit('Tasks', error)

  logStep('Tasks seeded successfully.')

  return data
}

async function seedDatabase(numEntriesPerTable) {
  const projectIds = (await seedProjects(numEntriesPerTable)).map(project => project.id)
  await seedTasks(numEntriesPerTable, projectIds)
}

const numEntriesPerTable = 10

seedDatabase(numEntriesPerTable)

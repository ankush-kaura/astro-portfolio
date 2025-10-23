require('dotenv').config();
const { createClient } = require('contentful-management');

// Debug: Check if environment variable is being read
console.log('Environment check:');
console.log('CONTENTFUL_MANAGEMENT_TOKEN exists:', !!process.env.CONTENTFUL_MANAGEMENT_TOKEN);
console.log('CONTENTFUL_SPACE_ID:', process.env.CONTENTFUL_SPACE_ID);
console.log('Token length:', process.env.CONTENTFUL_MANAGEMENT_TOKEN?.length || 0);

if (!process.env.CONTENTFUL_MANAGEMENT_TOKEN)
{
  console.error('ERROR: CONTENTFUL_MANAGEMENT_TOKEN not found in environment variables');
  console.error('Please make sure your .env file contains: CONTENTFUL_MANAGEMENT_TOKEN=your_token_here');
  process.exit(1);
}

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN
});

async function checkExistingContentTypes ()
{
  try
  {
    console.log('Checking existing content types...');
    const space = await client.getSpace('2y2ueqm0l7y8');
    const environment = await space.getEnvironment('master');
    const contentTypes = await environment.getContentTypes();

    console.log('Existing content types:');
    contentTypes.items.forEach(ct =>
    {
      console.log(`- ${ ct.sys.id }: ${ ct.name }`);
    });

    // Return both ID and name mapping to detect duplicates by name
    return contentTypes.items;
  } catch (error)
  {
    console.error('Error checking content types:', error.message);
    return [];
  }
}

async function createContentModel (space, contentTypeId, name, fields)
{
  try
  {
    const environment = await space.getEnvironment('master');
    const contentType = await environment.createContentType({
      name: name,
      description: `Content model for ${ name }`,
      displayField: fields[ 0 ]?.id || 'title',
      fields: fields
    });

    await contentType.publish();
    console.log(`Created and published content type: ${ contentTypeId }`);
    return contentType;
  } catch (error)
  {
    console.error(`Error creating content type ${ contentTypeId }:`, error.message);
  }
}

async function setupContentModels ()
{
  try
  {
    const space = await client.getSpace('2y2ueqm0l7y8');
    const environment = await space.getEnvironment('master');
    const existingTypes = await checkExistingContentTypes();

    // Define content models based on the static data I found
    const contentModels = [
      {
        id: 'about',
        name: 'About Me',
        fields: [
          {
            id: 'intro',
            name: 'Introduction',
            type: 'Text',
            required: true
          },
          {
            id: 'tools',
            name: 'Tools',
            type: 'Array',
            items: { type: 'Symbol' },
            required: true
          },
          {
            id: 'introBottom',
            name: 'Bottom Introduction',
            type: 'Text',
            required: false
          }
        ]
      },
      {
        id: 'experience',
        name: 'Work Experience',
        fields: [
          {
            id: 'company',
            name: 'Company',
            type: 'Symbol',
            required: true
          },
          {
            id: 'position',
            name: 'Position',
            type: 'Symbol',
            required: true
          },
          {
            id: 'location',
            name: 'Location',
            type: 'Symbol',
            required: false
          },
          {
            id: 'start',
            name: 'Start Date',
            type: 'Symbol',
            required: true
          },
          {
            id: 'end',
            name: 'End Date',
            type: 'Symbol',
            required: false
          },
          {
            id: 'link',
            name: 'Company Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'tasks',
            name: 'Tasks',
            type: 'Array',
            items: { type: 'Text' },
            required: false
          }
        ]
      },
      {
        id: 'study',
        name: 'Education/Study',
        fields: [
          {
            id: 'title',
            name: 'Study Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'institution',
            name: 'Institution',
            type: 'Symbol',
            required: true
          },
          {
            id: 'link',
            name: 'Institution Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'date',
            name: 'Date Range',
            type: 'Symbol',
            required: true
          }
        ]
      },
      {
        id: 'project',
        name: 'Project',
        fields: [
          {
            id: 'title',
            name: 'Project Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'description',
            name: 'Description',
            type: 'Text',
            required: true
          },
          {
            id: 'image',
            name: 'Project Image',
            type: 'Link',
            linkType: 'Asset',
            required: false
          },
          {
            id: 'link',
            name: 'Project Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'technologies',
            name: 'Technologies',
            type: 'Array',
            items: { type: 'Symbol' },
            required: false
          }
        ]
      },
      {
        id: 'contact',
        name: 'Contact Information',
        fields: [
          {
            id: 'email',
            name: 'Email',
            type: 'Symbol',
            required: true
          },
          {
            id: 'github',
            name: 'GitHub',
            type: 'Symbol',
            required: false
          },
          {
            id: 'linkedin',
            name: 'LinkedIn',
            type: 'Symbol',
            required: false
          },
          {
            id: 'instagram',
            name: 'Instagram',
            type: 'Symbol',
            required: false
          }
        ]
      },
      {
        id: 'intro',
        name: 'Introduction',
        fields: [
          {
            id: 'welcome',
            name: 'Welcome Text',
            type: 'Symbol',
            required: true
          },
          {
            id: 'name',
            name: 'Name',
            type: 'Symbol',
            required: true
          },
          {
            id: 'title',
            name: 'Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'image',
            name: 'Profile Image',
            type: 'Link',
            linkType: 'Asset',
            required: false
          },
          {
            id: 'alt',
            name: 'Image Alt Text',
            type: 'Symbol',
            required: true
          }
        ]
      },
      {
        id: 'site',
        name: 'Site Information',
        fields: [
          {
            id: 'title',
            name: 'Site Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'description',
            name: 'Site Description',
            type: 'Text',
            required: true
          },
          {
            id: 'github',
            name: 'GitHub Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'linkedin',
            name: 'LinkedIn Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'mail',
            name: 'Email Link',
            type: 'Symbol',
            required: false
          },
          {
            id: 'instagram',
            name: 'Instagram Link',
            type: 'Symbol',
            required: false
          }
        ]
      },
      {
        id: 'stack',
        name: 'Tech Stack',
        fields: [
          {
            id: 'tools',
            name: 'Tools',
            type: 'Array',
            items: { type: 'Symbol' },
            required: true
          }
        ]
      },
      {
        id: 'now',
        name: 'Current Status',
        fields: [
          {
            id: 'status',
            name: 'Current Status',
            type: 'Symbol',
            required: true
          }
        ]
      },
      {
        id: 'tattoo',
        name: 'Tattoo Information',
        fields: [
          {
            id: 'text',
            name: 'Description Text',
            type: 'Text',
            required: true
          },
          {
            id: 'image',
            name: 'Tattoo Image',
            type: 'Link',
            linkType: 'Asset',
            required: true
          },
          {
            id: 'alt',
            name: 'Image Alt Text',
            type: 'Symbol',
            required: true
          }
        ]
      },
      {
        id: 'quote',
        name: 'Quote',
        fields: [
          {
            id: 'quote',
            name: 'Quote Text',
            type: 'Text',
            required: true
          },
          {
            id: 'author',
            name: 'Author',
            type: 'Symbol',
            required: true
          }
        ]
      },
      {
        id: 'page',
        name: 'Page Information',
        fields: [
          {
            id: 'slug',
            name: 'Page Slug',
            type: 'Symbol',
            required: true
          },
          {
            id: 'title',
            name: 'Page Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'description',
            name: 'Page Description',
            type: 'Text',
            required: true
          }
        ]
      },
      {
        id: 'blog',
        name: 'Blog Post',
        fields: [
          {
            id: 'title',
            name: 'Blog Title',
            type: 'Symbol',
            required: true
          },
          {
            id: 'slug',
            name: 'Blog Slug',
            type: 'Symbol',
            required: true
          },
          {
            id: 'description',
            name: 'Blog Description',
            type: 'Text',
            required: true
          },
          {
            id: 'content',
            name: 'Blog Content',
            type: 'RichText',
            required: true
          },
          {
            id: 'heroImage',
            name: 'Hero Image',
            type: 'Link',
            linkType: 'Asset',
            required: false
          },
          {
            id: 'date',
            name: 'Publish Date',
            type: 'Date',
            required: true
          }
        ]
      },
      {
        id: 'timezone',
        name: 'Timezone',
        fields: [
          {
            id: 'place',
            name: 'Place',
            type: 'Symbol',
            required: true
          },
          {
            id: 'timezone',
            name: 'Timezone',
            type: 'Symbol',
            required: true
          }
        ]
      }
    ];

    // Create content models that don't exist (check by name to avoid duplicates)
    for (const model of contentModels)
    {
      const existingType = existingTypes.find(ct => ct.name.toLowerCase() === model.name.toLowerCase());

      if (existingType && existingType.sys.id !== model.id)
      {
        console.log(`⚠️  Content type "${ model.name }" already exists with different ID: ${ existingType.sys.id }`);
        console.log(`   Skipping creation of ${ model.id } to avoid duplicates`);
      }
      else if (!existingTypes.some(ct => ct.sys.id === model.id))
      {
        console.log(`Creating: ${ model.id } (${ model.name })`);
        await createContentModel(space, model.id, model.name, model.fields);
      }
      else
      {
        console.log(`✅ Content type ${ model.id } already exists`);
      }
    }

    console.log('\n=== FINAL STATUS ===');
    console.log('Content model setup completed!');

    // Show which models were created vs already existed
    contentModels.forEach(model =>
    {
      const existingType = existingTypes.find(ct => ct.name.toLowerCase() === model.name.toLowerCase());

      if (existingType && existingType.sys.id !== model.id)
      {
        console.log(`⚠️  ${ model.id }: ${ model.name } (duplicate avoided - exists as ${ existingType.sys.id })`);
      }
      else if (!existingTypes.some(ct => ct.sys.id === model.id))
      {
        console.log(`✅ ${ model.id }: ${ model.name } (newly created)`);
      }
      else
      {
        console.log(`✅ ${ model.id }: ${ model.name } (already existed)`);
      }
    });
  } catch (error)
  {
    console.error('Error setting up content models:', error.message);
  }
}

// Function to list all content types
async function listAllContentTypes ()
{
  try
  {
    console.log('\n=== CURRENT CONTENT TYPES ===');
    const space = await client.getSpace('2y2ueqm0l7y8');
    const environment = await space.getEnvironment('master');
    const contentTypes = await environment.getContentTypes();

    console.log('All content types in your space:');
    contentTypes.items.forEach(ct =>
    {
      console.log(`- ${ ct.sys.id }: ${ ct.name }`);
    });

    return contentTypes.items;
  } catch (error)
  {
    console.error('Error listing content types:', error.message);
    return [];
  }
}

// Run the setup and then list all types
async function runFullSetup ()
{
  await setupContentModels();
  await listAllContentTypes();
}

runFullSetup();
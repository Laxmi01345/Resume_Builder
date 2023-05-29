require('dotenv').config();
const axios = require('axios');
const readline = require('readline-sync');

const api_key = process.env.API_KEY;

console.log('Welcome to the Resume Builder');

const name = readline.question('Enter your name: ');
const email = readline.question('Enter your email: ');
const experience = readline.question('Enter your experience: ');
const education = readline.question('Enter your education: ');
const skills = readline.question('Enter your skills: ');

const userData = `
Name: ${name}
Email: ${email}
Experience: ${experience}
Education: ${education}
Skills: ${skills}
`;

const updatedPrompt = [
  {'role': 'system', 'content': 'You are a tech recruiter, who will analyze the provided data and explain what is the most suitable job for this person"s experience.'},
  {'role': 'user', 'content': userData}
]


async function generateResume() {
  try {
    console.log('Preparing to generate resume...');
    const api_key = process.env.API_KEY;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions'
      ,
      {
        model: 'gpt-3.5-turbo',
        messages: updatedPrompt,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${api_key}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Resume generation request sent.');

    if (response.status === 200) {
      console.log('Resume generated successfully.');

      const generatedResume = response.data.choices[0].message.content;

      console.log('Generated Resume:');
      console.log(generatedResume);
    } else {
      console.error('Error generating resume:', response.status);
    }
  } catch (error) {
    console.error('Error generating resume:', error.message);
  }
}
generateResume()

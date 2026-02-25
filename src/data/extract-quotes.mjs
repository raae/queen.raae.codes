import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the royal archive
const archivePath = '../../../the-royal-archive/slow-and-steady/kb/data';

function extractPodcastQuotes() {
  const quotes = [];
  
  // Get all episode JSON files
  const dataDir = join(__dirname, archivePath);
  const files = readdirSync(dataDir).filter(file => file.endsWith('.json'));
  
  console.log(`Found ${files.length} episode files to process...`);
  
  for (const file of files) {
    try {
      const episodeData = JSON.parse(readFileSync(join(dataDir, file), 'utf8'));
      
      if (episodeData.extracts && Array.isArray(episodeData.extracts)) {
        for (const extract of episodeData.extracts) {
          // Only include Queen's quotes that are ideas or thoughts
          if (extract.speaker === 'queen' && 
              extract.type?.includes('idea') &&
              extract.text &&
              extract.text.length > 20 && // Minimum length for good quotes
              extract.text.length < 200 && // Maximum length for readability
              extract.strength >= 2) { // Only include medium to high strength quotes
            
            quotes.push({
              id: extract.id,
              text: extract.text,
              fullText: extract.full_text,
              episode: episodeData.episode,
              title: episodeData.title,
              date: episodeData.date,
              themes: extract.themes,
              context: extract.context,
              timestamp: extract.timestamp_start,
              strength: extract.strength,
              isReal: true
            });
          }
        }
      }
    } catch (error) {
      console.warn(`Error processing ${file}:`, error.message);
    }
  }
  
  console.log(`Extracted ${quotes.length} real quotes from podcasts`);
  return quotes;
}

// Sample AI-generated quotes in Queen's style
// These would be replaced with actual AI generation
function generateAIQuotes() {
  return [
    {
      id: 'ai-1',
      text: "Sometimes the best productivity hack is admitting you're in a scattered phase and just riding the wave.",
      isReal: false,
      themes: ['rest-and-sustainability'],
      context: "AI-generated quote about accepting natural productivity cycles"
    },
    {
      id: 'ai-2', 
      text: "I've learned that building in public means showing the messy middle, not just the polished outcomes.",
      isReal: false,
      themes: ['building-in-public'],
      context: "AI-generated quote about authentic building in public"
    },
    {
      id: 'ai-3',
      text: "The gap between 'this should be simple' and 'why is this taking three weeks' is where real product experience lives.",
      isReal: false,
      themes: ['developer-experience', 'bootstrapped-saas-life'],
      context: "AI-generated quote about product development complexity"
    },
    {
      id: 'ai-4',
      text: "When you're a bootstrapped founder, every feature decision is really asking: 'Is this worth three months of our runway?'",
      isReal: false,
      themes: ['bootstrapped-saas-life'],
      context: "AI-generated quote about bootstrapped prioritization"
    },
    {
      id: 'ai-5',
      text: "Family integration isn't about perfect work-life balance, it's about honest conversations at dinner about why mommy was typing all weekend.",
      isReal: false,
      themes: ['family-and-life-integration'],
      context: "AI-generated quote about authentic family integration"
    },
    {
      id: 'ai-6',
      text: "The moment you think you've figured out developer experience is exactly when your users discover seventeen edge cases you never considered.",
      isReal: false,
      themes: ['developer-experience'],
      context: "AI-generated quote about DX complexity"
    },
    {
      id: 'ai-7',
      text: "Security isn't just about protecting data; it's about protecting the trust your users place in your vibe-coded weekend project.",
      isReal: false,
      themes: ['developer-experience'],
      context: "AI-generated quote about security responsibility"
    },
    {
      id: 'ai-8',
      text: "AI coding feels like having a very confident intern who's wrong about 30% of the details but right about 70% of the patterns.",
      isReal: false,
      themes: ['ai-and-productivity'],
      context: "AI-generated quote about AI development tools"
    }
  ];
}

// Main execution
const realQuotes = extractPodcastQuotes();
const aiQuotes = generateAIQuotes();

// Mix and shuffle quotes for the quiz
const allQuotes = [...realQuotes, ...aiQuotes];
const shuffled = allQuotes.sort(() => Math.random() - 0.5);

// Create quiz data structure
const quizData = {
  version: '1.0',
  generatedAt: new Date().toISOString(),
  totalQuotes: allQuotes.length,
  realQuotes: realQuotes.length,
  aiQuotes: aiQuotes.length,
  quotes: shuffled.map((quote, index) => ({
    ...quote,
    quizId: index + 1
  }))
};

// Write to file
const outputPath = join(__dirname, 'queen-ai-quiz.json');
writeFileSync(outputPath, JSON.stringify(quizData, null, 2));

console.log(`✅ Quiz data created with ${quizData.totalQuotes} quotes`);
console.log(`📝 Real quotes: ${quizData.realQuotes}`);
console.log(`🤖 AI quotes: ${quizData.aiQuotes}`);
console.log(`💾 Saved to: ${outputPath}`);
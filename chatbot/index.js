// Let's start with importing `NlpManager` from `node-nlp`. This will be responsible for training, saving, loading and processing.

import { NlpManager } from 'node-nlp';
console.log('Starting MindMate Mental Health Chatbot ...');

// Create a singleton instance that loads once
let manager = null;
let isInitialized = false;

const initializeChatbot = async () => {
  if (!isInitialized) {
    manager = new NlpManager({ languages: ['en'] });
    
    try {
      // First try to load the existing model.nlp file
      try {
        await manager.load('./model.nlp');
        console.log('Existing model.nlp loaded successfully for MindMate');
      } catch (loadError) {
        console.log('Could not load existing model.nlp, training new MindMate model...');
        // If loading fails, train with basic mental health knowledge
        await trainBasicMentalHealthBot(manager);
        await manager.save('./model.nlp');
        console.log('New MindMate model trained and saved');
      }
      
      isInitialized = true;
    } catch (error) {
      console.error('Error initializing MindMate chatbot:', error);
      // Fallback: create a basic manager
      manager = new NlpManager({ languages: ['en'] });
      isInitialized = true;
    }
  }
  return manager;
};

// Train basic mental health bot if no existing model
async function trainBasicMentalHealthBot(manager) {
  console.log('Training basic MindMate mental health chatbot...');
  
  // Study-related stress and anxiety
  manager.addDocument('en', 'I feel anxious about my studies', 'study.anxiety');
  manager.addDocument('en', 'I am stressed about exams', 'study.anxiety');
  manager.addDocument('en', 'I worry about failing my classes', 'study.anxiety');
  manager.addDocument('en', 'I have test anxiety', 'study.anxiety');
  manager.addDocument('en', 'I feel overwhelmed with homework', 'study.anxiety');
  manager.addDocument('en', 'I am afraid of disappointing my parents', 'study.anxiety');
  
  // Loneliness and isolation
  manager.addDocument('en', 'I feel lonely', 'social.loneliness');
  manager.addDocument('en', 'I have no friends', 'social.loneliness');
  manager.addDocument('en', 'I feel isolated', 'social.loneliness');
  manager.addDocument('en', 'Nobody understands me', 'social.loneliness');
  manager.addDocument('en', 'I feel left out', 'social.loneliness');
  
  // Sleep issues
  manager.addDocument('en', 'I cannot sleep', 'health.sleep');
  manager.addDocument('en', 'I have insomnia', 'health.sleep');
  manager.addDocument('en', 'I stay up all night', 'health.sleep');
  manager.addDocument('en', 'I am tired all the time', 'health.sleep');
  manager.addDocument('en', 'I have trouble falling asleep', 'health.sleep');
  
  // Depression and low mood
  manager.addDocument('en', 'I feel sad', 'mood.depression');
  manager.addDocument('en', 'I feel hopeless', 'mood.depression');
  manager.addDocument('en', 'I do not want to do anything', 'mood.depression');
  manager.addDocument('en', 'I feel worthless', 'mood.depression');
  manager.addDocument('en', 'I cry a lot', 'mood.depression');
  
  // Stress management
  manager.addDocument('en', 'I feel overwhelmed', 'stress.management');
  manager.addDocument('en', 'I cannot handle the pressure', 'stress.management');
  manager.addDocument('en', 'I am stressed out', 'stress.management');
  manager.addDocument('en', 'I need help with stress', 'stress.management');
  
  // Motivation and procrastination
  manager.addDocument('en', 'I lack motivation', 'study.motivation');
  manager.addDocument('en', 'I procrastinate too much', 'study.motivation');
  manager.addDocument('en', 'I cannot focus on my studies', 'study.motivation');
  manager.addDocument('en', 'I am lazy', 'study.motivation');
  
  // Self-harm and crisis
  manager.addDocument('en', 'I want to hurt myself', 'crisis.selfharm');
  manager.addDocument('en', 'I think about suicide', 'crisis.suicide');
  manager.addDocument('en', 'I want to die', 'crisis.suicide');
  manager.addDocument('en', 'Life is not worth living', 'crisis.suicide');
  
  // Add answers for each intent
  manager.addAnswer('en', 'study.anxiety', `I understand that academic pressure can be overwhelming. Here are some strategies that might help:

1. **Break tasks into smaller parts** - Don't try to study everything at once
2. **Practice deep breathing** - Take 5 deep breaths when you feel anxious
3. **Set realistic goals** - Focus on progress, not perfection
4. **Take regular breaks** - Study for 25 minutes, then take a 5-minute break
5. **Talk to your teachers** - They want to help you succeed

Remember: Your worth is not defined by your grades. You're doing your best, and that's enough.`);

  manager.addAnswer('en', 'social.loneliness', `Feeling lonely is really hard, and many students experience this. Here are some ways to connect:

1. **Join clubs or groups** - Find people with similar interests
2. **Reach out to classmates** - Many feel the same way
3. **Use social media mindfully** - Connect with old friends
4. **Volunteer** - Helping others can create meaningful connections
5. **Talk to a counselor** - They can help you build social skills

Remember: You're not alone in feeling lonely, and it's okay to ask for help.`);

  manager.addAnswer('en', 'health.sleep', `Good sleep is crucial for mental health and academic performance. Try these tips:

1. **Stick to a schedule** - Go to bed and wake up at the same time
2. **Create a bedtime routine** - Read, listen to calming music, or meditate
3. **Avoid screens 1 hour before bed** - Blue light can interfere with sleep
4. **Keep your room cool and dark** - Optimal temperature is 65-68°F
5. **Avoid caffeine after 2 PM** - It can stay in your system for hours

If sleep problems persist, consider talking to a healthcare provider.`);

  manager.addAnswer('en', 'mood.depression', `I'm sorry you're feeling this way. Depression is serious and treatable. Here's what you can do:

1. **Talk to someone you trust** - A friend, family member, or counselor
2. **Practice self-care** - Even small things like showering or eating
3. **Get some sunlight** - Vitamin D can help improve mood
4. **Exercise gently** - A short walk can boost endorphins
5. **Consider professional help** - Therapy and medication can be very effective

**Important**: If you're having thoughts of harming yourself, please call the National Suicide Prevention Lifeline at 988 immediately. You matter, and help is available.`);

  manager.addAnswer('en', 'stress.management', `Managing stress is a skill that takes practice. Here are some effective techniques:

1. **Deep breathing** - Try the 4-7-8 technique: inhale 4, hold 7, exhale 8
2. **Progressive muscle relaxation** - Tense and relax each muscle group
3. **Mindfulness** - Focus on the present moment without judgment
4. **Time management** - Use a planner and prioritize tasks
5. **Physical activity** - Even 10 minutes of movement can reduce stress

Remember: It's okay to take breaks and ask for help when you need it.`);

  manager.addAnswer('en', 'study.motivation', `Lack of motivation is common, especially when you're stressed. Try these strategies:

1. **Start small** - Commit to just 5 minutes of study
2. **Use the Pomodoro technique** - 25 minutes work, 5 minutes break
3. **Find your "why"** - Remind yourself why your education matters
4. **Create a study environment** - Find a place where you feel productive
5. **Reward yourself** - Give yourself small rewards for completing tasks

Remember: Motivation follows action, not the other way around. Start small and build momentum.`);

  manager.addAnswer('en', 'crisis.selfharm', `I'm really concerned about what you're going through. You deserve help and support. Please:

1. **Call 988** - National Suicide Prevention Lifeline (24/7)
2. **Text HOME to 741741** - Crisis Text Line
3. **Go to the nearest emergency room** - They can help keep you safe
4. **Tell someone you trust** - A friend, family member, or counselor
5. **Remove harmful objects** - Keep yourself safe right now

**You are not alone, and this pain won't last forever. Please reach out for help immediately.**`);

  manager.addAnswer('en', 'crisis.suicide', `I'm very worried about you, and I want you to be safe. Please know that:

1. **Your life has value** - Even if you can't see it right now
2. **This pain is temporary** - Feelings change, and help is available
3. **Call 988 immediately** - National Suicide Prevention Lifeline
4. **Go to the emergency room** - They can help keep you safe
5. **Tell someone now** - Don't keep these thoughts to yourself

**Please, please reach out for help right now. You matter, and people care about you.**`);

  // Train the model
  await manager.train();
  console.log('Basic MindMate mental health chatbot training completed');
}

const chatbot = async (inputValue) => {
  try {
    const chatbotManager = await initializeChatbot();
    const response = await chatbotManager.process('en', inputValue);
    
    if (response.answer) {
      return response.answer;
    }
    
    // Fallback responses for unrecognized inputs
    const fallbackResponses = [
      "I hear you, and I want to help. Could you tell me more about what you're experiencing?",
      "That sounds really challenging. I'm here to listen and support you. What's on your mind?",
      "I understand this is difficult for you. Let's talk about it more. How are you feeling right now?",
      "Thank you for sharing that with me. I'm here to help. What would be most helpful for you right now?",
      "I want to make sure I understand you correctly. Could you explain a bit more about what you're going through?"
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    
  } catch (error) {
    console.error('MindMate chatbot error:', error);
    return 'I understand you\'re going through something difficult. I\'m here to listen and support you. How can I help you today?';
  }
};

export default chatbot;

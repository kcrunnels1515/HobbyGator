import './Quiz.css';
import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';


const Quiz = () => {  
  const [response, setResponse] = useState(0); // state to store the response
  const [showSuggestions, setShowSuggestions] = useState(false);  // State to control the visibility of the suggestion
  const [selectedOption, setSelectedOption] = useState('');  // State to store the user's choice
  
  const questions = [ 
  { text: "What hobby do you already have?",
    options: [
      { text: 'Hiking', value: 'hiking' },
      { text: 'Reading', value: 'reading' },
      { text: 'Cooking', value: 'cooking' },
      { text: 'None :(', value: 'none' },
    ],
  },
  { text: "What smells good to you?",
    options : [
      { text: 'Mint', value: 'mint' },
      { text: 'Oranges', value: 'oranges' },
      { text: 'Balloons', value: 'balloons' },
      { text: 'Jasmine', value: 'jasmine' },
    ],
  },
  { text: "What's your favorite color?",
    options : [
      { text: 'Pink', value: 'pink' },
      { text: 'Magenta', value: 'magenta' },
      { text: 'Fuschia', value: 'fuschia' },
      { text: 'Crustacean', value: 'crustacean' },
    ],
  },
  { text: "What's your greatest fear?",
    options : [
      { text: 'Clowns', value: 'clowns' },
      { text: 'Technology', value: 'technology' },
      { text: 'Hobbies', value: 'hobbies' },
      { text: 'Spiders', value: 'spiders' },
    ],
  },
  { text: "What's your favorite season?",
  options : [
    { text: 'Spring', value: 'spring' },
    { text: 'Summer', value: 'summer' },
    { text: 'Fall', value: 'fall' },
    { text: 'Winter', value: 'winter' },
  ],
}
  ];
   // Dedicated list of hobbies to return to
   const hobbyList = [
    "photography", "gardening", "knitting", "woodworking", "baking",
    "swimming", "chess", "cycling", "yoga", "art", "flying",
    "fishing", "running", "weightlifting", "looksmaxxing", "magnets",
    "film", "improv", "guitar", "singing", "checkers"
  ];

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  const handleSubmit = () => {
    if (selectedOption) {
      // Random hobby from list
      const randomHobby = hobbyList[Math.floor(Math.random() * hobbyList.length)];

      setResponse(`${randomHobby}`);
      setShowSuggestions(true);
    } else {
      setResponse('Please select an option to find a hobby!');
      setShowSuggestions(false);
    }
  };


    return (
      <h3 className = 'form'>
        <div>
          <h1 className='title'>{'Find a new hobby!'}</h1>
          {/* Making quiz  */}
        
          {questions.map((question, index) => (
          <div className = "quiz" key={index}>
            <p className='questions'>{question.text}</p>
            {question.options.map(option => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={question.text}
                  value={option.value}
                  onChange={() => handleOptionChange(option.value)}
                /> {option.text}
              </label>
            ))}
          </div>
          ))}
          <quiz>
            <button className= "onClick" onClick={handleSubmit}>Submit</button>
            {/* Display the response if suggestions are to be shown */}
            {showSuggestions && 
            <h2 className='center'>
              You should try {response}!
              <Link to= {'/forum/' + response}> Click here!</Link>
            </h2>}            
          </quiz>
      </div>
    </h3>
  );
};

export default Quiz;

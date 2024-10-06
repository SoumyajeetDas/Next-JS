import { useState } from 'react';
import React from 'react';
import { buildFeedbackPath, extractFeedback } from '../api/feedback/feedback';

const FeedbackPage: React.FC<{
  feedbackItems: { id: string; text: string; email: string }[];
}> = (props) => {
  const [feedbackData, setFeedbackData] = useState<{
    id: string;
    text: string;
    email: string;
  }>();

  function loadFeedbackHandler(id: string) {
    fetch(`/api/feedback/${id}`, { method: 'GET' })
      .then((response) => response.json())
      .then((data) => {
        setFeedbackData(data.feedback);
      }); // /api/some-feedback-id
  }

  return (
    <>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}{' '}
            <button onClick={() => loadFeedbackHandler(item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export async function getStaticProps() {
  // You can use here buildFeedbackPath() and extractFeedback() functions  from api folder bcoz they can only be used in server side
  // and getSTaticProps() only executes code in Server Side.
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;

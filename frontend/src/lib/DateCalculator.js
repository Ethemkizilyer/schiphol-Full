import React, { useState, useEffect } from 'react';
import moment from 'moment';

function TimeDifferenceCalculator({ estimatedLandingTime, expectedTimeOnBelt }) {
    const [timeDifference, setTimeDifference] = useState(null);
  
    useEffect(() => {
      const landingTime = moment(estimatedLandingTime);
      const beltTime = moment(expectedTimeOnBelt);
  
      const duration = moment.duration(beltTime.diff(landingTime));
  
      setTimeDifference(duration.humanize());
    }, [estimatedLandingTime, expectedTimeOnBelt]);

  return (
    <div>
      <p>{timeDifference}</p>
    </div>
  );
}

export default TimeDifferenceCalculator;
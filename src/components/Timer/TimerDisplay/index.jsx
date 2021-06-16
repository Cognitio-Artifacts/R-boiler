import { useEffect, useState, Fragment } from 'react';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import classnames from 'classnames';
import { AUX } from './helper';

import './styles.scss';

const SIXTY = 60;
const A_THOUSAND_MILLIS = 1000;
const ZEROES = '00';
const TWENTY_FIVE = '25';

const TimerDisplay = () => {
  const [timeDisplay, setTimeDisplay] = useState({ minutes: TWENTY_FIVE, seconds: ZEROES })
  // eslint-disable-next-line no-use-before-define
  let countdown = 0;

  const handleClick = (minutes) => {
    const timeFrameInMillis = minutes * SIXTY * A_THOUSAND_MILLIS;
    const initialTimeInEpoch = new Date(2030, 0).getTime() + timeFrameInMillis;
    const runTimerUntil = minutes * SIXTY;
    countdown = initialTimeInEpoch;

    setTimeDisplay({
      seconds: ZEROES,
      minutes: AUX.formatString(minutes)
    })

    interval(A_THOUSAND_MILLIS)
      .pipe(take(runTimerUntil))
      .subscribe(() => {
        countdown -= A_THOUSAND_MILLIS;
        const ticker = new Date(countdown);

        setTimeDisplay({
          seconds: AUX.formatString(ticker.getSeconds()),
          minutes: AUX.formatString(ticker.getMinutes())
        })
      });
  }

  useEffect(() => {

  }, [timeDisplay])

  return (
    <Fragment>
      <div className="timer">
        <span className="timer-display-minutes">{timeDisplay.minutes}</span>
        <span className="timer-display-colon">:</span>
        <span className="timer-display-seconds">{timeDisplay.seconds}</span>
      </div>
      <div className="buttons">
        <button className={classnames('buttons-5')} onClick={() => handleClick(5)}>5'</button>
        <button className={classnames('buttons-15')} onClick={() => handleClick(15)}>15'</button>
        <button className={classnames('buttons-25')} onClick={() => handleClick(25)}>25'</button>
      </div>
    </Fragment>
  )
}

export { TimerDisplay }
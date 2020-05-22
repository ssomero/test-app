import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

export default function LikeButton() {
  const [likeCount, setLikeCount] = useState(100);
  const [like, setLike] = useState(false);
  const isInitialMount = useRef(true);
  
  const handleClick = (event) => {
    setLike(!like);
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
   } else {
      if (like) {
        setLikeCount(likeCount + 1);
      } else {
        setLikeCount(likeCount - 1);
      }
    }
  }, [like]);

  return (
    <React.Fragment>
      <div>
        <h3>Like Button</h3>
        <button className={cx('like-button', { 'liked': like })} type="button" onClick={handleClick}>
        <span>Like</span>|<span className="likes-counter">{likeCount}</span>
        </button>
      </div>
      <style>{`
        .like-button {
          min-width: 6rem;
          padding: .5rem;
          font-size: 1rem;
          color:  #585858;
        }
        .liked {
          font-weight: bold;
          color: #1565c0;
        }
        `}</style>
    </React.Fragment>
  );
}

import { useState, useEffect } from 'react';

const useScroll = () => {
   // storing this to get the scroll direction
   const [lastScrollTop, setLastScrollTop] = useState(0);
    // the offset of the document.body
   const [bodyOffset, setBodyOffset] = useState(
     document.body.getBoundingClientRect()
   );
   const [scrollY, setScrollY] = useState(bodyOffset.top);
    // scroll direction would be either up or down
   const [scrollDirection, setScrollDirection] = useState();

   const listener = e => {
     setBodyOffset(document.body.getBoundingClientRect());
     setScrollY(-bodyOffset.top);
     setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up");
     setLastScrollTop(-bodyOffset.top);
   };

   useEffect(() => {
     window.addEventListener("scroll", listener);
     return () => {
       window.removeEventListener("scroll", listener);
     };
   });

   return {
     scrollY,
     scrollDirection
   };
};

export default useScroll;
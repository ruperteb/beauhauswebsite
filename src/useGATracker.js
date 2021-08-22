import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GA4React, { useGA4React } from "ga-4-react";

const useGATracker = () => {
    const location = useLocation();
    const [initialized, setInitialized] = useState(false);

    const ga4react = new GA4React(
        'YOUR GA CODE',
     //   { /* ga custom config, optional */ },
     //   [ /* additional code, optional */ ],
     //   5000 /* timeout, optional, defaults is 5000 */,
      //  options /* { nonce: ['first-script-is-async','second-script'] } */
        
        );

    useEffect(() => {
        if (!window.location.href.includes("localhost")) {
            ga4react.initialize("UA-G-XJDR325FGS");
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
            console.log(location.pathname)
            /* ga4react.pageview(location.pathname); */
         //   ga4react.gtag('event','pageview','path') // or your custom gtag event
        }
    }, [initialized, location]);
};

export default useGATracker;
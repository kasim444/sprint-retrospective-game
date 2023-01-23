import { logEvent } from "firebase/analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics } from "services/firebase";

export const usePageViews = () => {
  const { pathname } = useLocation();

  const trackPathForAnalytics = () => {
    logEvent(analytics, "screen_view", {
      firebase_screen: pathname,
      firebase_screen_class: pathname,
    });
  };

  useEffect(() => {
    trackPathForAnalytics();
  }, [trackPathForAnalytics]);
};

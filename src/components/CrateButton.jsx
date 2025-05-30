import { useEffect } from "react";

function CrateButton() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@widgetbot/crate@3";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      new window.Crate({
        server:1377938003862884362,
channel:1377938003862884365 // replace with your channel ID
      });
    };
    document.body.appendChild(script);
  }, []);

  return null; // Nothing is rendered, Crate floats by itself
}

export default CrateButton;

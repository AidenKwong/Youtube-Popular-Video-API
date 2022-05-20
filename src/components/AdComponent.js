import { useEffect } from "react";

const AdComponent = () => {
  useEffect(() => {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-1890424135903675"
      data-ad-slot="7117210525"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdComponent;

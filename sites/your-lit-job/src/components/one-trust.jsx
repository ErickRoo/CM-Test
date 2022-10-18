import React from "react";

function OneTrust() {
  function embedCode() {
      if (process.env.NODE_ENV === 'production') {
        // Production embed code
        return `
        <!-- OneTrust Cookies Consent Notice start for timeforkids.com -->
        <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript" charset="UTF-8" data-domain-script="f38b90f5-9280-47c2-8495-ac6bf7d7dd64"></script>
        <script type="text/javascript">
        function OptanonWrapper() { }
        </script>
        <!-- OneTrust Cookies Consent Notice end for timeforkids.com -->
        `;
      }

      // Development embed code
      return `
        <!-- OneTrust Cookies Consent Notice start for timeforkids.com -->
        <script src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js" type="text/javascript" charset="UTF-8" data-domain-script="f38b90f5-9280-47c2-8495-ac6bf7d7dd64-test"></script>
        <script type="text/javascript">
        function OptanonWrapper() { }
        </script>
        <!-- OneTrust Cookies Consent Notice end for timeforkids.com -->
      `;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: embedCode()}} />
  )
}

export default OneTrust;

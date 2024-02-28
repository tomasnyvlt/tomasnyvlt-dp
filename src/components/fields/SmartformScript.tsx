const SmartformScript = () => {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: `  <script type="text/javascript">
          var smartform = smartform || {};
          
          smartform.beforeInit = function () {
                smartform.setClientId('jyaqh2cBYa');
          }
          </script>  <script type="text/javascript" src="https://client.smartform.cz/v2/smartform.js" async> </script>
        `
      }}
    />
  );
};

export default SmartformScript;

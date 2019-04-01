import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const webMap = ({auth}) => {
  const elementRef = useRef();
  useEffect(_ => {
    let cleanup;
    // lazy load the module that loads the JSAPI
    // and initialize it
    import("../WebMap/mapComponent").then(
      app => cleanup = app.initialize(elementRef.current, auth.user)
    );
    return () => cleanup && cleanup();
  }, []);

  // assign elementRef to the ref of our component
  return (
    <div className="viewDiv" ref={elementRef}>
    </div>
  );
}

webMap.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(webMap);




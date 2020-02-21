import React from 'react';

const Hashtag = () => {
    return (
        <div>
            HashTag
        </div>
    );
};

Hashtag.getInitialProps = async (context) => {
    console.log('hashtag getInitialProps',context.query.tag);
};

export default Hashtag;
import React from 'react';




const Main_Page = () => {
    return (
        <div>
            <h1>Main Page</h1>

            <a href={"/about"}>Goto About</a>

            <button
                onClick={async () => {
                  let ret = await window.electron.invokeFunction("test arg");
                  alert(ret);
                }}
            >
                Call
            </button>
        </div>
    );
};

export {
    Main_Page
}
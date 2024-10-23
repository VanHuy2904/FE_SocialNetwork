import React from "react";

export default function Search({ userSearch }) {
  return (
    <div className="relative bottom-0 bg-white w-full rounded h-max flex-col">
      {userSearch.length > 0 ? (
        userSearch.map((item, index) => (
          <div
            className="w-full h-max flex hover:bg-slate-200 p-2 rounded"
            key={index}
          >
            <div className="w-10 h-10">
              <img
                className="w-10 h-10 rounded-full"
                src="https://wpkixx.com/html/pitnik/images/resources/author.jpg"
                alt=""
              />
            </div>
            <div className="flex items-center ml-2">
              <p className="text-sm">{item.name}</p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

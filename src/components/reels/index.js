import { memo } from "react";

function Reels() {
  return (
    <>
      <div className="h-full bg-white w-full mt-5 text-start p-3">
        <div className="mb-3">
          <p>Reels</p>
        </div>
        <hr />
        <div className="flex mt-3 ml-2 mb-3">
          <div className="w-1/4 h-56  rounded-lg mr-3 relative">
            <div className="w-full h-full  rounded-lg mr-3 relative overflow-hidden">
              <img
                className="transition ease-in delay-150 object-cover h-full w-full rounded-lg hover:scale-105 duration-200 inset-0 transition-opacity hover:opacity-100	 "
                src="https://wpkixx.com/html/pitnik/images/resources/story-1.jpg"
                alt=""
              />
              {console.log(1321)}
            </div>
            <div className="group absolute top-0 left-2">
              <button className="text-xl">+</button>
              <div className="absolute -top-4 bg-black p-1 rounded hidden group-hover:block w-auto">
                <p className="text-xs text-white w-max">Add your story</p>
              </div>
            </div>
          </div>
          <div className="w-1/4 h-56  rounded-lg mr-3 relative overflow-hidden">
            <img
              className="transition ease-in delay-150 object-cover h-full w-full rounded-lg hover:scale-105 duration-200 inset-0 transition-opacity hover:opacity-100	 "
              src="https://wpkixx.com/html/pitnik/images/resources/story-1.jpg"
              alt=""
            />
            <div className="mt-4 flex items-center ">
              <div className="rounded-full w-9 h-9 mr-2 ml-1 absolute top-3 left-2 border">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-1/4 h-56  rounded-lg mr-3 relative overflow-hidden">
            <img
              className="transition ease-in delay-150 object-cover h-full w-full rounded-lg hover:scale-105 duration-200 inset-0 transition-opacity hover:opacity-100	 "
              src="https://wpkixx.com/html/pitnik/images/resources/story-1.jpg"
              alt=""
            />
            <div className="mt-4 flex items-center ">
              <div className="rounded-full w-9 h-9 mr-2 ml-1 absolute top-3 left-2 border">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="w-1/4 h-56  rounded-lg mr-3 relative overflow-hidden">
            <img
              className="transition ease-in delay-150 object-cover h-full w-full rounded-lg hover:scale-105 duration-200 inset-0 transition-opacity hover:opacity-100	 "
              src="https://wpkixx.com/html/pitnik/images/resources/story-1.jpg"
              alt=""
            />
            <div className="mt-4 flex items-center ">
              <div className="rounded-full w-9 h-9 mr-2 ml-1 absolute top-3 left-2 border">
                <img
                  src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Reels);

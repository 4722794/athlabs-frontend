import { useCallback, useEffect, useState } from "react";
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

// const FF = createFFmpeg({
//   // log: true,
// });

// (async function () {
//   await FF.load();
// })();

function VideoTrimmer({ rStart, setRstart, rEnd, setRend, videoMeta }: any) {
  // const [trimIsProcessing, setTrimIsProcessing] = useState(false);

  // const handleTrim = useCallback(async () => {
  //   setTrimIsProcessing(true);
  //   let startTime: any = ((rStart / 100) * 100).toFixed(2);
  //   let endTime: any = ((rEnd / 100) * 100).toFixed(2);
  //   let offset = (endTime - startTime).toFixed(2);

  //   try {
  //     FF.FS("writeFile", inputVideoFile.name, await fetchFile(inputVideoFile));
  //     // await FF.run('-ss', '00:00:13.000', '-i', inputVideoFile.name, '-t', '00:00:5.000', 'ping.mp4');
  //     await FF.run(
  //       "-ss",
  //       toTimeString(startTime),
  //       "-i",
  //       inputVideoFile.name,
  //       "-t",
  //       toTimeString(offset),
  //       "-c",
  //       "copy",
  //       "ping.mp4"
  //     );

  //     const data = FF.FS("readFile", "ping.mp4");
  //     const trimmedVideoBlob = new Blob([data.buffer], { type: "video/mp4" });

  //     const trimmedVideoFile = new File([trimmedVideoBlob], `${videoMeta?.name}`, {
  //       type: "video/mp4",
  //     });

  //     return trimmedVideoFile;
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setTrimIsProcessing(false);
  //   }
  // }, [FF, inputVideoFile, rEnd, rStart]);

  // useEffect(() => {
  //   setHandleTrim(handleTrim);
  // }, [handleTrim]);

  function formatTime(seconds: any) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }

  return (
    <div className="u-center flex flex-col w-full" style={{ margin: "1rem" }}>
      <label className="text-white text-lg font-semibold mb-2">
        Select max 20 sec video for analysis
      </label>
      <Nouislider
        behaviour="tap-drag"
        step={1}
        margin={5}
        limit={20}
        range={{ min: 0, max: videoMeta?.duration || 2 }}
        start={[0, videoMeta?.duration || 2]}
        connect
        onEnd={(values) => {
          setRstart(values[0]);
          setRend(values[1]);
        }}
      />
      <div className="flex justify-between items-center mt-2">
        <span className="text-white text-sm font-semibold font-mono">
          {formatTime(rStart)}
        </span>
        <span className="text-white text-sm font-semibold font-mono">
          {formatTime(rEnd)}
        </span>
      </div>
    </div>
  );
}

export default VideoTrimmer;

// const toTimeString = (sec: any, showMilliSeconds = true) => {
//   sec = parseFloat(sec);
//   let hours: any = Math.floor(sec / 3600); // get hours
//   let minutes: any = Math.floor((sec - hours * 3600) / 60); // get minutes
//   let seconds:any = sec - hours * 3600 - minutes * 60; //  get seconds
//   // add 0 if value < 10; Example: 2 => 02
//   if (hours < 10) {
//     hours = "0" + hours;
//   }
//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }
//   if (seconds < 10) {
//     seconds = "0" + seconds;
//   }
//   let maltissaRegex = /\..*$/; // matches the decimal point and the digits after it e.g if the number is 4.567 it matches .567

//   let millisec = String(seconds).match(maltissaRegex);
//   return (
//     hours +
//     ":" +
//     minutes +
//     ":" +
//     String(seconds).replace(maltissaRegex, "") +
//     (showMilliSeconds ? (millisec ? millisec[0] : ".000") : "")
//   );
// };

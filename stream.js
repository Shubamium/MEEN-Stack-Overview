// Stream example for reading big file

const fs = require("fs");

const readStream = fs.createReadStream("./other/spam.txt", {
  encoding: "utf-8", //Automatically tell the stream to know what the format of the file is supposed to be
});
const writeStream = fs.createWriteStream("./other/spam2.txt");

// Event called everytime node get a data from the file
// readStream.on("data", (chunk) => {
//   console.log("New Data Received:");
//   console.log(chunk);

//   // Write the data received into a new write stream / other file
//   writeStream.write("\n NEW CHUNK \n");
//   writeStream.write(chunk);
// }); // Stream event listener

// Piping
readStream.pipe(writeStream);

"use server"

import {createHmac} from "node:crypto";

async function hash(data: string) {
  const hash = createHmac('sha256', data)
      .update('I love cupcakes')
      .digest('hex');
  console.log(hash);
  return hash;
}

export {
  hash
}
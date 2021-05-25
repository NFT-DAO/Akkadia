/**
 * Copyright [2021] [Quinn Parkinson]
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License. 
 *
 */
import axios from 'axios';


/**
 * Given a url return the response assuming a working Project_id.
 * @todo Store projectID in env and reference it.
 * @param {string} url
 * @param {string} projectID
 * @param {file} file
 * @return {response}
 */
const get = (url, projectID, file='') => {
  return axios({
    method: 'get',
    headers: {
      'Project_id': projectID
    },
    url: url,
    files: file
  })
  .then(res => {
    return res;
  })
  .catch(err => {
    return err;
  });
};

// Export
export default {
  get
};
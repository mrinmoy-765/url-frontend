import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import AuthUser from './AuthUser';

export default function ShortLink() {
  const navigate = useNavigate();
  const {http,setToken} = AuthUser();
  const [link, setLink] = useState('');

  const submitForm = () =>{
        // api call
        http.post('/generate-shorten-link',{link:link}).then((res)=>{
            navigate('../fetchdata')
        })
    }

  return (
    <div className="row justify-content-left pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <h1 className="text-center mb-3">Enter your Link </h1>
          <div className="form-group">
            <label>Link:</label>
            <input
              type="text" // Fix the type from 'test' to 'text'
              className="form-control"
              placeholder="Enter Link"
              onChange={(e) => setLink(e.target.value)}
              id="link"
            />
          </div>

          <button type="button" onClick={submitForm} className="btn btn-primary mt-4">
            Short Link
          </button>
        </div>
      </div>
    </div>
  );
}

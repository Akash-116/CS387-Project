import React, { useState } from 'react';
import PaginationComp from '../Pagination';

const UploadAndDisplayImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <h1>Upload and Display Image usign React Hook's</h1>
      {selectedImage && (
        <div>
          <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
          <br />
          <button onClick={() => setSelectedImage(null)}>Remove</button>
        </div>
      )}
      <br />

      <br />
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImage(event.target.files[0]);
        }}
      />
    </div>
  );
};

const Preferences = () => {




  return (
    <div>
      <h5>Preferences - Ths is a dummy component (rough work kinda)</h5>

      <p>3. Lets try Pagination</p>
      <PaginationComp></PaginationComp>


      <p>1. Lets try creating a nice table first</p>
      <div className='container'>
        <form>

          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
            <div class="col-sm-7">
              <input type="email" class="form-control" id="inputEmail3">
              </input>
            </div>
          </div>

          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
            <div class="col-sm-7">
              <input type="password" class="form-control" id="inputPassword3">
              </input>
            </div>
          </div>

          <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0">Radios</legend>

            <div class="col-sm-7">
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                </input>
                <label class="form-check-label" for="gridRadios1">
                  First radio
                </label>
              </div>
              <div class="form-check">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                </input>
                <label class="form-check-label" for="gridRadios2">
                  Second radio
                </label>
              </div>
              <div class="form-check disabled">
                <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="option3" disabled>
                </input>
                <label class="form-check-label" for="gridRadios3">
                  Third disabled radio
                </label>
              </div>
            </div>

          </fieldset>

          <div class="row mb-3">
            <div class="col-sm-7 offset-sm-2">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck1">
                </input>
                <label class="form-check-label" for="gridCheck1">
                  Example checkbox
                </label>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>

      <p>2. Lets try creating a upload Image component</p>

      <UploadAndDisplayImage></UploadAndDisplayImage>

    </div>
  );
};



export default Preferences;

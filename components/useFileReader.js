/* USAGE

import React from 'react'
import { useFileReader } from 'react-use-file-reader'

export const MyComponent = prop => {
  const [{ result, error, loading }, setFile] = useFileReader({
    method: 'readAsDataURL',
  })

  const onInputFile = e => {
    setFile(e.target.files[0])
  }

  return (
    <>
      {loading ? <p>Reading file</p> : null}
      {error ? <p>{error.message}</p> : null}
      {result ? <img src={result} /> : null}
      <input type="file" accept=".jpg,.png,.svg" onInput={onInputFile} />
    </>
  )
}
*/

import { useEffect, useState } from 'react';

const noop = () => {};

export const useFileReader = (options = {}) => {
  const { method = 'readAsText', onload: onloadHook = noop } = options;
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (result && !file) {
      setError(null);
      setResult(null);
      setLoading(null);
    }
    if (!file) return;
    const reader = new FileReader(file);
    reader.onloadstart = () => {
      setLoading(true);
    };
    reader.onloadend = (e) => {
      setResult(e.target.result);
      setLoading(false);
    };
    reader.onload = (e) => {
      onloadHook(e.target.result);
    };
    reader.onError = (e) => {
      setError(e);
    };
    try {
      reader[method](file);
    } catch (e) {
      setError(e);
    }
  }, [file]);

  return [{ result, error, file, loading }, setFile];
};

import Head from 'next/head';
import { useState, useEffect } from 'react';
import { transformNamespace } from 'i18next-v4-format-converter';
import { CopyToClipboard } from '../components/CopyToClipboard';
import { download } from '../components/utils';
import { useFileReader } from '../components/useFileReader';

const DUMMY_JSON = `{
  "key": "value",
  "keyPluralSimple": "the singular",
  "keyPluralSimple_plural": "the plural"
}`

function convert(lng, content) {
  return JSON.stringify(transformNamespace(lng, JSON.parse(content)), null, 2);
}

export default function Home() {
  const [lng, setLng] = useState('en');
  const [{ result, file, error, loading }, setFile] = useFileReader();
  // console.warn(result, file, error, loading)
  const [err, setErr] = useState();
  const [sourceJSON, setSourceJSON] = useState(DUMMY_JSON);
  const [targetJSON, setTargetJSON] = useState(convert('en', DUMMY_JSON));

  useEffect(() => {
    if (result) setSourceJSON(result);
    if (file && file.name) {
      const p = file.name.split('.');
      if (p.length > 2) {
        const eventualLanguage = p[p.length - 2].split('-')[0];
        if (eventualLanguage.length === 2) setLng(eventualLanguage);
      }

    }
  }, [result])


  const handleChange = (value) => {
    setSourceJSON(value);

    try {
      setTargetJSON(convert(lng, value));
      if (err) setErr('');
    } catch (e) {
      setErr(e.toString());
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  return (
    <div>
      <Head>
        <title>i18next JSON V3 to V4</title>
        <meta name="description" content="Converts i18next JSON format V3 to V4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div style={{ zIndex: 2000, backgroundColor: '#1976d2', height: 50, display: 'flex', alignItems: 'center', position: 'fixed', top: 0, width: '100%' }}>
        <img src="./locize_white.svg" style={{ width: 90, marginLeft: 20 }} />
      </div>

      <div style={{ zIndex: 1, margin: '50px 0', backgroundColor: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 10px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', width: '80%', backgroundColor: '#f7f7f7', borderRadius: 15, padding: '25px 50px'}}>
            <img src="./i18next.png" style={{ width: 90, height: 90, marginRight: 30 }} />
            <h2 style={{ color: '#009688' }}>Convert your i18next JSON files from V3 to V4 format.</h2>
          </div>
        </div>

        {!!err && (
          <div style={{ display: 'flex', padding: '0 40px' }}>
            <p style={{ color: 'red' }}>{err}</p>
          </div>
        )}
        <div style={{ display: 'flex', alignItems: 'center', padding: '10px 30px 0 30px'}}>
          <div style={{ width: '50%', padding: 10 }}>
            <label style={{ display: 'block', margin: '0 0 5px' }}>Source JSON in V3:</label>
            <textarea className="conv-textfield"  style={{ width: '100%', height: 250, padding: 10 }} id="sourceJSON" value={sourceJSON} onChange={(e) => { handleChange(e.target.value) }}></textarea>
          </div>
          <div style={{ width: '50%', padding: 10 }}>
            <label style={{ display: 'block', margin: '0 0 5px' }}>Target Output converted to V4:</label>
            <textarea className="conv-textfield"  style={{ width: '100%', height: 250, padding: 10 }} id="targetJSON" value={targetJSON} readOnly></textarea>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0px 30px'}}>
          <div style={{ width: '50%', padding: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <label htmlFor="lng"><strong>Specify the language of your file:</strong></label>
              <input className="conv-textfield" style={{ width: 100, marginLeft: 25 }} id="lng" value={lng} onChange={(e) => { setLng(e.target.value) }} />
            </div>
            <label htmlFor="contained-button-file" className="conv-btn" style={{ marginRight: 5 }} >upload file</label>
            <input id="contained-button-file" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
          </div>
          <div style={{ width: '50%', padding: 10 }}>
            <CopyToClipboard text={targetJSON} />
            <button className="conv-btn" style={{ marginLeft: 5 }} onClick={() => {
              download(file ? file.name : `translation.${lng}.JSON`, targetJSON)
            }}>download</button>
          </div>
        </div>
        <div style={{ padding: 10, marginTop: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '0px 30px'}}>
            <div style={{ display: 'flex', alignItems: 'center'}}>
              <i>Have a look at <strong><a href="https://github.com/i18next/i18next-v4-format-converter">i18next-v4-format-converter</a></strong> if you want to use this converter as CLI or programmatically.</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

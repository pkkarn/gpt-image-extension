import React, { useState, useEffect } from 'react';
import { Input, Button, InputNumber, Row, Col } from 'antd';

const SettingComponent:React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [totalGeneration, setTotalGeneration] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
  
    useEffect(() => {
      // Load initial state from chrome.storage.local
      chrome.storage.local.get(['prompt', 'totalGeneration', 'isRunning'], (result) => {
        if (result.prompt !== undefined) setPrompt(result.prompt);
        if (result.totalGeneration !== undefined) setTotalGeneration(result.totalGeneration);
        if (result.isRunning !== undefined) setIsRunning(result.isRunning);
      });
    }, []);
  
    useEffect(() => {
      // Save state to chrome.storage.local whenever it changes
      chrome.storage.local.set({ prompt, totalGeneration, isRunning });
    }, [prompt, totalGeneration, isRunning]);
  
    const toggleRunning = () => {
      setIsRunning(!isRunning);
    };
  
    return (
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt"
            size="large"
          />
        </Col>
        <Col span={12}>
          <InputNumber
            min={1}
            value={totalGeneration}
            onChange={(number) => {setTotalGeneration(number)}}
            placeholder="No. of generation"
            size="large"
          />
        </Col>
        <Col span={12}>
          <Button
            type="primary"
            onClick={toggleRunning}
            size="large"
            style={{ backgroundColor: isRunning ? 'red' : 'green', borderColor: isRunning ? 'red' : 'green' }}
          >
            {isRunning ? 'Stop' : 'Start'}
          </Button>
        </Col>
      </Row>
    );
  };


export const Popup:React.FC = () => {
    const [title, setTitle] = useState(chrome.runtime.getManifest().name) 
    return (
        <>
            <div>
                <h1>{title}</h1>
                <SettingComponent/>
            </div>
        </>
    )
}
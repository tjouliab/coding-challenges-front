import { Exercice } from './App';
import Home from './components/0-home/Home';
import WcTool from './components/1-wc-tool/WcTool';
import JsonParser from './components/2-json-parser/JsonParser';

export const EXERCICE_LIST: Exercice[] = [
  {
    component: Home,
    componentName: 'Home',
    path: '/',
    active: false,
  },
  {
    component: WcTool,
    componentName: 'Wc Tool',
    path: '/wc-tool',
    active: false,
  },
  {
    component: JsonParser,
    componentName: 'JSON Parser',
    path: '/json-parser',
    active: false,
  },
];

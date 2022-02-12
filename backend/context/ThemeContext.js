import { createContext, useMemo, useState } from 'react';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export default ColorModeContext;
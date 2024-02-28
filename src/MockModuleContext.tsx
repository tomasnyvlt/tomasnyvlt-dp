/**
 * @file A fully mockable replacement for Shell's ModuleContextProvider.
 *
 * The exports have to be named the same way as in Shell!
 */
import { createContext, useContext } from 'react';

const mockModuleContext = createContext({});

export const ModuleContextProvider = mockModuleContext.Provider;

export const useModuleProps = () => useContext(mockModuleContext);

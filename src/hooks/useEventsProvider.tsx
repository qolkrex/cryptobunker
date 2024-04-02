import { useCallback } from "react";

export const useEventsProvider = (handleAccount: any, handleChainId: any) => {
	const accountsChanged = useCallback(
		(accounts: any) => handleAccount(accounts[0]),
		[handleAccount]
	);
	const chainChanged = useCallback(
		(chainId: any) => handleChainId(chainId),
		[handleChainId]
	);

	return {
		accountsChanged,
		chainChanged,
	};
};

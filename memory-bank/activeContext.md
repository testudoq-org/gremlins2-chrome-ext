# Right-Click Start Gremlins Flow

## Event Sequence

1. **Context Menu Registration** (`background-index.js`)
   - On extension installation, creates context menu item:
   ```javascript
   chrome.contextMenus.create({
     id: 'launch-gremlins',
     title: 'Launch Full Gremlin Horde',
     contexts: ['all']
   });
   ```

2. **Context Menu Click Handler** (`background-index.js`)
   - When user right-clicks and selects "Launch Full Gremlin Horde":
   - Triggers `chrome.contextMenus.onClicked` listener
   - For 'launch-gremlins' ID:
     - Sends message to content script with 15 second default duration:
     ```javascript
     chrome.tabs.sendMessage(tab.id, { 
       command: 'startGremlins', 
       attackDuration: 15 
     });
     ```

3. **Content Script Message Handler** (`content-index.js`)
   - Receives message via `chrome.runtime.onMessage` listener
   - When command is 'startGremlins':
     - Calls `startGremlins(message.attackDuration)`

4. **Gremlin Horde Creation** (`content-index.js`)
   - Inside `startGremlins` function:
     1. Converts duration to milliseconds
     2. Clears any existing attack timeout
     3. Sets up strategies:
        ```javascript
        const strategies = [];
        if (gremlins.strategies.timeLimit) {
          strategies.push(gremlins.strategies.timeLimit({ milliseconds }));
        } else {
          strategies.push(gremlins.strategies.distribution({ delay: 100 }));
        }
        ```
     4. Creates and unleashes horde:
        ```javascript
        horde = gremlins.createHorde({ strategies });
        horde.unleash();
        ```

5. **Attack Timeout Setup** (`content-index.js`)
   - Sets timeout to stop gremlins after specified duration:
     ```javascript
     attackTimeout = setTimeout(() => {
       stopGremlins();
       chrome.runtime.sendMessage({ 
         command: 'updateToggleButtonText', 
         attacking: false 
       });
     }, milliseconds);
     ```

6. **Auto-Stop Sequence** (`content-index.js`)
   - When timeout triggers:
     1. Calls `stopGremlins()`
     2. Stops the horde if active
     3. Clears timeout
     4. Updates UI state via messages
     5. Reloads extension

## Key Variables

- `horde`: Stores the active gremlin horde instance
- `attackTimeout`: Manages the timer for auto-stopping the attack
- `attackDuration`: Default 15 seconds for context menu launch

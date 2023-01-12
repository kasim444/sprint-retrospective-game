# MODELS

## users ( /uId )

- displayName
- roomId

## rooms ( /roomId )

- roomId
- cards ( /cardId )
- players ( /uId )
  - uId
- gameState
  - isStart
  - completedPlayers
  - onlinePlayers

## cards ( / cardId )

- cardId
- question
- color
- isActive
- uId
- cardOwnerDisplayName

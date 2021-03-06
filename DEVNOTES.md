# Current tasks
- [x] Display the number of sprite being renderer within the fragments overlay
- [x] Render grid lines to the canvas
- [x] Add grid snapping for selection transform
- [x] Refactor hardcoded values into the main configuration file
- [x] Create editor-renderer.ts and move functionality for selection highlighting into this file (not the transform)
- [x] Refactor the sprite fragments array to remove the imageData being stored there have the sprite render from the tileset
- [ ] Add keyboard binding to cancel current pending sprite
- [x] Add the ability to toggle selection mode on and off
- [ ] Configure toolbar actions
	- [x] Stamp
		- [ ] Implement in renderer
	- [x] Selection
		- [ ] Implement in renderer
	- [x] Shape fill
		- [ ] Implement in renderer
	- [ ] Bucket fill
	- [x] Select same tile
		- [x] When moving mouse slowly the highlighting does not work
	- [-] Eraser
- [ ] Extend layer editing functionality
	- [x] Add a way to set the current layer for editor renderer
	- [x] Ensure the toolbar item actions apply to the current layer
	- [x] Seed test data with more than one layer
	- [x] Add the ability to lock layers
	- [x] Highlight current layer (LOOK INTO REFACTOR)
		- [x] Add layer opacity
	- [x] Add the ability to re-order layers
	- [ ] Duplicate layer
	- [ ] Delete layer
- [ ] When in selection mode if the context menu is open any actions should apply to the selection area
	- [ ] Add bucket fill
	- [ ] Delete selection
	- [ ] Duplicate selection
	- [ ] Move selection
	- [ ] Move selection up
	- [ ] Move selection down
	- [ ] Move selection to back
	- [ ] Move selection to front
	- [ ] Flip selection by x
	- [ ] Flip selection by y
- [ ] Add the ability to specify new tilesets
	- [ ] Add the ability to open a dialog from the file dropdown in the main menu
- [ ] Add the ability to scroll the canvas area for larger size canvases
- [ ] Add the ability to create new maps
	- [ ] Add the ability to open a dialog from the file dropdown in the main menu
		- [ ] Allow to set specific map dimensions
		- [ ] Allow for infinite map dimensions
- [ ] Add sprite inspector for when sprites in the canvas are clicked.
	- [ ] Display transform
	- [ ] Display tileset
	- [ ] Display tileset transform

# Current bugs
- [ ] In selection mode when filling an area with sprites you can only go from top left to bottom right
- [ ] You can add a layer without a name
- [ ] In select same tile mode if two sprites on on the same coordinates the background tile is the only accessible tile
	need to loop backwards through the tiles when looking for selection highlights
- [ ] In shape file you can't fill the origin of the canvas

# Need to be done at some point
- [ ] Add state manager overlay to enable browsing the current state
- [ ] Implement Sass for the default styles
- [ ] Ensure the load order works for all the other overlay positions 

# Components
- [x] Tag component
- [x] Sprite renderer component
- [x] Material component
- [ ] Audio source component
- [x] Collider component
- [ ] Particles component
- [ ] Tilemap component
- [ ] Image component

- For editor add axios or something.
- Add image component (ALMOST DONE)
	- Still need to actual render the images.
- Clean up (DONE)
- Add tilemap component (ACTUALLY USE RENDERER)
- Add camera component
	- Is there a way to limit to one component per scene.
- Add js-yaml to editor project (DONE)
- Create inspector panel for when an entity is clicked you can
view the components attached to the entity
	- Need to be able to remove components from the inspector
		- Not all components can be deleted. Stuff like transform and tag.
	- Need to be able to manage component values from the inspector
- Rename map-editor-component to scene-editor-component
- Launch the current scene from the editor
- Save the current scene from the editor
- Delete a scene from the editor
- View all the scenes from the editor
- Look at storing the scenes in a sequelize database or something (RIGHT NOW JUST DOING FILE SYSTEM)
- Start adding UI components
	- Text
	- Button
	- Panel 
- Start basic demo game
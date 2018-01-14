class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.config = config;

        this.state = [];
        this.count = 0;
        this.state.push(this.config.initial);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state[this.count];
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!this.config.states[state]) throw new Error('the state is not set');

        this.count++;
        this.state.splice(this.count, 1, state);
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {

        if (!this.config.states[this.getState()].transitions[event]) throw new Error('the state is not set');

        let state = this.config.states[this.getState()].transitions[event];
        this.count++;
        this.state.splice(this.count, 1, state);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.count++;
        this.state.splice(this.count, 1, this.config.initial);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let statesArr = [];
        
        if (event) {
            for (const key in this.config.states) {
                if (this.config.states[key].transitions[event]) {
                    statesArr.push(key);
                }
            }
        } else {
            for (const key in this.config.states) {
                statesArr.push(key);
            }
        }

        return statesArr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if ((this.count - 1) < 0) return false;

        this.count--;
        return true;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if ((this.count + 1) >= this.state.length) return false;

        this.count++;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.state = [];
        this.count = 0;
        this.state.push(this.config.initial);
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
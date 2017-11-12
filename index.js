var ProjectModule = (function () {

    const project = {
        participants: [],
        pricing: { },
        isBusy: false,

        /* implement initialization of the object */
        /* participants - predefined array of participants */
        /* pricing - predefined object (keyvalue collection) of pricing */
        init(participants, pricing) {
            if(typeof participants !== 'undefined') this.participants = participants;
            if(typeof pricing !== undefined) this.pricing = pricing;
        },

        /* pass found participant into callback, stops on first match */
        /* functor - function that will be executed for elements of participants array */
        /* callbackFunction - function that will be executed with found participant as argument or with null if not */
        /* callbackFunction (participant) => {} */
        findParticipant(functor, callbackFunction) {
            if(this.isBusy) return false;
            var that = this;
            that.isBusy = true;
            setTimeout(() => {

                for(var p of that.participants)
                {
                    if (functor(p)) {
                        callbackFunction(p);
                        that.isBusy = false;
                        return;
                    }
                }
                that.isBusy = false;
                callbackFunction(null);

            });

        },

        /* pass array of found participants into callback */
        /* functor - function that will be executed for elements of participants array */
        /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
        /* callbackFunction (participantsArray) => {} */
        findParticipants(functor, callbackFunction) {
            if(this.isBusy) return false;
            this.isBusy = true;
            var that = this;

            setTimeout(() => {
                var res = [];
                for(var p of that.participants)
                {
                    if (functor(p)) {
                        res.push(p);
                    }
                }
                that.isBusy = false;
                callbackFunction(res);

            });
        },

        /* push new participant into this.participants array */
        /* callbackFunction - function that will be executed when job will be done */
        /* (err) => {} */
        addParticipant(participantObject, callbackFunction) {
            if(this.isBusy) return false;
            this.isBusy = true;
            var that = this;
            setTimeout(() => {

                if(typeof participantObject.seniorityLevel === 'undefined') {
                    that.isBusy = false;
                    callbackFunction(1);
                }
                else
                {
                    that.participants.push(participantObject);
                    that.isBusy = false;
                    callbackFunction();
                }

            });
        },

        /* push new participant into this.participants array */
        /* callback should receive removed participant */
        /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
        removeParticipant(participantObject, callbackFunction) {
            if(this.isBusy) return false;
            this.isBusy = true;
            var that = this;
            setTimeout(() => {

                var index = that.participants.indexOf(participantObject);
                if(index !== -1)
                {
                    let removed = that.participants.splice(index, 1);
                    that.isBusy = false;
                    callbackFunction(removed[0]);
                }
                else
                {
                    that.isBusy = false;
                    callbackFunction(null);
                }


            });
        },

        /* Extends this.pricing with new field or change existing */
        /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
        setPricing(participantPriceObject, callbackFunction) {
            if(this.isBusy) return false;
            this.isBusy = true;
            var that = this;
            setTimeout(() => {

                let seniority = Object.keys(participantPriceObject).pop();
                that.pricing[seniority] = participantPriceObject[seniority];
                that.isBusy = false;
                callbackFunction();

            });
        },

        /* calculates salary of all participants in the given period */
        /* periodInDays, has type number, one day is equal 8 working hours */
        calculateSalary(periodInDays) {
            let total = 0;
            for (let p of this.participants)
            {
                if(typeof this.pricing[p.seniorityLevel] === 'undefined') throw new Error("No pricing found");
                total += periodInDays * 8 * this.pricing[p.seniorityLevel];
            }
            return total;
        }
    }

    return {
        getInstance: function () {
            return project;
        }
    };
})();

module.exports = {
    firstName: 'Татьяна',
    lastName: 'Мазурец',
    task: ProjectModule
}

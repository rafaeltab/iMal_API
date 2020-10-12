import {isUUID, getUUID, getPKCE} from '../../src/helpers/randomCodes';
import {expect} from 'chai';

describe('UUID tests', () => {
    it('isUUID Should return true on valid lower case uuid', () => {
        const uuid = "550e8400-e29b-41d4-a716-446655440000".toLowerCase();
        expect(isUUID(uuid)).to.equal(true);
    });
    it('isUUID Should return true on valid upper case uuid', () => {
        const uuid = "550e8400-e29b-41d4-a716-446655440000".toUpperCase();
        expect(isUUID(uuid)).to.equal(true);
    });
    it('isUUID Should return false on invalid lower case uuid', () => {
        const uuid = "550e8400-e29b-41d4-a716-446655440000s";
        expect(isUUID(uuid)).to.equal(false);
    });
    it('isUUID Should return false on invalid upper case uuid', () => {
        const uuid = "550e8400-e29b-41d4-a716-446655440000s".toUpperCase();
        expect(isUUID(uuid)).to.equal(false);
    });

    it('getUUID Should return valid lower case uuid', () => {
        let uuid = getUUID();
        expect(isUUID(uuid)).to.equal(true);
    });
});

describe('Other Random Codes tests', () => {
    it('getPKCE Should return code with length within 2 away from given length', () => {
        for(let i:number = 0; i < 100; i++){
            let length = Math.floor((Math.random() * 100) + 1);

            let pkce = getPKCE(length);
            expect(pkce.length).to.be.greaterThan(length-2);
            expect(pkce.length).to.be.lessThan(length+2);
        }
    })
    it('getPKCE Should return url valid code', () => {
        let pkce = getPKCE(4827);
        let encoded = encodeURI(pkce)
        expect(encoded).to.equal(pkce);
    })
})